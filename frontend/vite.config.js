import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  server:{
    watch:{
      usePolling: true
    },
    host: '0.0.0.0',
    port: 5173,
  }, 
  preview:{
    port: 5173,
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    },
    chunkSizeWarningLimit: 600,
}});
