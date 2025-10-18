import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";

declare global {
  interface Window {
    server: Server;
  }
}

const mockPosts = [
  {
    id: "0",
    username: "weeknd",
    displayName: "The Weeknd",
    content: "Hello, World!",
    timeAgo: "30 minutes ago",
    likes: 11,
    comments: 2,
    reposts: 1,
    isVerified: true,
    avatar:
      "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
    images: [
      "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
    ],
  },
  {
    id: "1",
    username: "jay",
    displayName: "Jay",
    content: "Come to visit my GitHub!",
    timeAgo: "1 hour ago",
    likes: 7,
    comments: 1,
    reposts: 6,
    link: "https://github.com/lonely-wolf-howl",
    linkThumbnail: "https://avatars.githubusercontent.com/u/130229450?v=4",
    isVerified: true,
    avatar: "https://avatars.githubusercontent.com/u/130229450?v=4",
  },
  {
    id: "2",
    username: "sabrina",
    displayName: "Sabrina",
    content: "Hello, World!",
    timeAgo: "2 hour ago",
    likes: 3,
    comments: 1,
    reposts: 3,
    isVerified: true,
    avatar:
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
    images: [
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/c/c5/Man%27s_Best_Friend.png/revision/latest?cb=20250905110110",
    ],
  },
];

const mockReplies: Record<string, any[]> = {
  "0": [
    {
      id: "0",
      username: "sabrina",
      displayName: "Sabrina",
      content: "Hello, The Weeknd!",
      timeAgo: "10 minutes ago",
      likes: 1,
      comments: 0,
      reposts: 0,
      isVerified: true,
      avatar:
        "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
    },
  ],
};

const mockUsers = [
  {
    id: "weeknd",
    name: "The Weeknd",
    description: "After Hours",
    profileImageUrl:
      "https://static.wikia.nocookie.net/the-weeknd/images/c/c1/The_Weeknd_-_After_Hours.png/revision/latest?cb=20220106031501",
  },
  {
    id: "jay",
    name: "Jay",
    description: "backend developer",
    profileImageUrl: "https://avatars.githubusercontent.com/u/130229450?v=4",
  },
  {
    id: "sabrina",
    name: "Sabrina",
    description: "Short n' Sweet",
    profileImageUrl:
      "https://static.wikia.nocookie.net/sabrina-carpenter/images/0/07/Short_n%27_Sweet.png/revision/latest?cb=20240802050532",
  },
];

const userPosts: Record<string, string[]> = {
  weeknd: ["0"],
  jay: ["1"],
  sabrina: ["2"],
};

if (__DEV__) {
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
            followingUsernames.includes(post.username)
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
    },
  });
}
