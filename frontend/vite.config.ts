/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": "Enter your backend host with port inside the quotes",
    },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  build: {
    outDir: "./build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
  },
  resolve: {
    alias: [
      {
        find: "@Components",
        replacement: resolve(__dirname, "./src/components"),
      },
      {
        find: "@Basic",
        replacement: resolve(__dirname, "./src/components/basic"),
      },
      {
        find: "@Form",
        replacement: resolve(__dirname, "./src/components/form"),
      },
      {
        find: "@Context",
        replacement: resolve(__dirname, "./src/context"),
      },
      {
        find: "@Utils",
        replacement: resolve(__dirname, "./src/utils"),
      },
    ],
  },
});
