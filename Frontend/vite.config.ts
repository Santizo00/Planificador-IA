import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: './', // ✅ rutas relativas para que los recursos funcionen en producción
  plugins: [react()],
  build: {
    outDir: 'dist', // por defecto es 'dist', pero puedes ponerlo explícito
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  }
});
