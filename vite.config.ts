import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        prices: path.resolve(__dirname, "prices.html"),
        services: path.resolve(__dirname, "services.html"),
        liquid: path.resolve(__dirname, "liquid.html"),
        showcase: path.resolve(__dirname, "showcase.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
