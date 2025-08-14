import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windicss from 'vite-plugin-windicss';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), windicss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
