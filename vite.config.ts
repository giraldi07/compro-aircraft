import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Aktifkan SW saat development
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/graphql/, // Perbaikan untuk URL GraphQL
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "graphql-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination && request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        sw: "public/sw.ts", // Pastikan SW di-compile
      },
    },
  },
});
