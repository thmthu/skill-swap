import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, 
    proxy: {
      "/api": {
        target: "http://backend:3000",  
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": { 
        target: "http://backend:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
