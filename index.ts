import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";

declare global {
  interface Window {
    server: Server;
  }
}

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
    },
  });
}
