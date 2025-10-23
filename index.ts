import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";
import { mockPosts, mockReplies, mockUsers, userPosts } from "./mocks/data";
import * as Device from "expo-device";

declare global {
  interface Window {
    server: Server;
  }
}

if (__DEV__ && Device.isDevice) {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.post("/login", (_, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        if (username === "username" && password === "password") {
          return {
            accessToken: "access-token",
            refreshToken: "refresh-token",
            user: {
              id: "jay",
              name: "Jay",
              description: "backend developer",
              profileImageUrl:
                "https://avatars.githubusercontent.com/u/130229450?v=4",
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });

      this.get("/posts", (_, request) => {
        const cursor = request.queryParams.cursor;
        const type = request.queryParams.type || undefined;

        let filteredPosts = mockPosts;

        if (type === "following") {
          const followingUsernames = ["sabrina"];
          filteredPosts = mockPosts.filter((post) =>
            followingUsernames.includes(post.user.id)
          );
        }

        if (cursor) {
          const cursorIndex = filteredPosts.findIndex((p) => p.id === cursor);
          if (cursorIndex !== -1 && cursorIndex < filteredPosts.length - 1) {
            return { posts: filteredPosts.slice(cursorIndex + 1) };
          }
          return { posts: [] };
        }

        return { posts: filteredPosts };
      });

      this.get("/posts/:id", (_, request) => {
        const id = request.params.id;
        const post = mockPosts.find((p) => p.id === id);
        if (post) {
          return { post };
        } else {
          return new Response(404, {}, { message: "Post not found" });
        }
      });

      this.get("/posts/:id/replies", (_, request) => {
        const id = request.params.id;
        const replies = mockReplies[id] || [];
        return { replies };
      });

      this.get("/users/:userId", (_, request) => {
        const userId = request.params.userId;
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          return { user };
        } else {
          return new Response(404, {}, { message: "User not found" });
        }
      });

      this.get("/users/:userId/threads", (_, request) => {
        const userId = request.params.userId;
        const cursor = request.queryParams.cursor;

        const postIds = userPosts[userId] || [];
        const posts = postIds
          .map((id) => mockPosts.find((p) => p.id === id))
          .filter(Boolean);

        if (cursor) {
          const cursorIndex = posts.findIndex((p) => p?.id === cursor);
          if (cursorIndex !== -1 && cursorIndex < posts.length - 1) {
            return { posts: posts.slice(cursorIndex + 1) };
          }
          return { posts: [] };
        }

        return { posts };
      });

      this.post("/posts", async (_, request) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const formData = request.requestBody as unknown as FormData;
          const posts: Record<string, any>[] = [];

          if (typeof formData?.forEach !== "function") {
            return new Response(
              500,
              {},
              {
                success: false,
                message: "FormData parsing not supported",
              }
            );
          }

          formData.forEach((value, key) => {
            const match = key.match(/posts\[(\d+)\]\[(\w+)\](\[(\d+)\])?$/);

            if (match) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [_, index, field, , imageIndex] = match;
              const i = parseInt(index);
              const imgI = parseInt(imageIndex);

              if (!posts[i]) {
                posts[i] = {};
              }

              if (field === "imageUrls") {
                if (!posts[i].imageUrls) {
                  posts[i].imageUrls = [] as string[];
                }
                (posts[i].imageUrls as string[])[imgI] = (
                  value as unknown as { uri: string }
                ).uri;
              } else if (field === "location") {
                const locationValue = value as string;
                if (
                  locationValue &&
                  locationValue !== "undefined" &&
                  locationValue !== "null"
                ) {
                  try {
                    posts[i].location = JSON.parse(locationValue);
                  } catch (error) {
                    console.error(error);
                  }
                }
              } else {
                posts[i][field] = value as string;
              }
            }
          });

          if (!posts || posts.length === 0) {
            return new Response(
              400,
              {},
              { success: false, message: "No posts data provided" }
            );
          }

          // Create main post from the first thread
          const mainPost = posts[0];
          const newPostId = String(mockPosts.length);

          const newPost: any = {
            id: newPostId,
            user: {
              id: mainPost.userId,
              name: "Jay",
              profileImageUrl:
                "https://avatars.githubusercontent.com/u/130229450?v=4",
              isVerified: true,
            },
            content: mainPost.content || "",
            timeAgo: "Just now",
            likes: 0,
            comments: 0,
            reposts: 0,
          };

          if (mainPost.imageUrls && mainPost.imageUrls.length > 0) {
            newPost.imageUrls = mainPost.imageUrls;
          }
          if (mainPost.location) {
            newPost.location = mainPost.location;
          }

          // Add to the beginning of mock post lists
          mockPosts.unshift(newPost);

          // Add to user's post list
          const userId = mainPost.userId;
          if (!userPosts[userId]) {
            userPosts[userId] = [];
          }
          userPosts[userId].unshift(newPostId);

          // Process additional threads as replies
          if (posts.length > 1) {
            const replies = posts.slice(1).map((post: any, index: number) => {
              const reply: any = {
                id: `${newPostId}_reply_${index}`,
                user: {
                  id: post.userId,
                  name: "Jay",
                  profileImageUrl:
                    "https://avatars.githubusercontent.com/u/130229450?v=4",
                  isVerified: true,
                },
                content: post.content || "",
                timeAgo: "Just now",
                likes: 0,
                comments: 0,
                reposts: 0,
              };

              if (post.imageUrls && post.imageUrls.length > 0) {
                reply.imageUrls = post.imageUrls;
              }
              if (post.location) {
                reply.location = post.location;
              }

              return reply;
            });

            if (!mockReplies[newPostId]) {
              mockReplies[newPostId] = [];
            }
            mockReplies[newPostId].push(...replies);
          }

          return new Response(
            201,
            {},
            {
              success: true,
              message: "Post created successfully",
              post: newPost,
              threadCount: posts.length,
            }
          );
        } catch (error) {
          console.error(error);
          return new Response(
            500,
            {},
            {
              success: false,
              message: "Failed to create post",
              error: String(error),
            }
          );
        }
      });
    },
  });
}
