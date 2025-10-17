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
    username: "arnold",
    displayName: "Arnold",
    content: "Hello, World!",
    timeAgo: "30 minutes ago",
    likes: 11,
    comments: 2,
    reposts: 1,
    isVerified: true,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    images: ["https://picsum.photos/id/29/800/600"],
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
      "https://townsquare.media/site/252/files/2024/06/attachment-Sabrina-Carpenter.jpg?w=1200&q=75&format=natural",
    images: [
      "https://picsum.photos/id/38/800/600",
      "https://picsum.photos/id/141/800/600",
    ],
  },
];

const mockReplies: Record<string, any[]> = {
  "0": [
    {
      id: "0",
      username: "sabrina",
      displayName: "Sabrina",
      content: "Hello, Arnold!",
      timeAgo: "10 minutes ago",
      likes: 1,
      comments: 0,
      reposts: 0,
      isVerified: true,
      avatar:
        "https://townsquare.media/site/252/files/2024/06/attachment-Sabrina-Carpenter.jpg?w=1200&q=75&format=natural",
    },
  ],
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
              id: "threads-id",
              name: "threads-name",
              description: "backend developer",
              profileImageUrl: "https://",
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });

      this.get("/posts", () => {
        return { posts: mockPosts };
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
    },
  });
}
