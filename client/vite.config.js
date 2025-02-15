import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      sitemap({
        hostname: "https://geochat.live",
        exclude: ["/chatroom", "/access-denied"],
        dynamicRoutes: ["/about"]
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      https:
        mode === "development"
          ? {
              key: fs.readFileSync(path.resolve(__dirname, "../key.pem")),
              cert: fs.readFileSync(path.resolve(__dirname, "../cert.pem")),
            }
          : false,
      host: true,
      proxy: {
        "/api": {
          target: "https://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
        "/socket.io": {
          target: "https://localhost:3000",
          changeOrigin: true,
          ws: true,
          secure: false,
          xfwd: true,
        },
      },
    },
  };
});
