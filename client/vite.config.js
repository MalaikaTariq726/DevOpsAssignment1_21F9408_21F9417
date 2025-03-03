import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensures it is accessible from Docker
    port: 5173, // Ensures correct port usage
    strictPort: true, // Prevents random port assignment
  },
});
