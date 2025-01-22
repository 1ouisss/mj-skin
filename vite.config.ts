
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      host: "0.0.0.0",
      clientPort: 443,
      protocol: 'wss'
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
