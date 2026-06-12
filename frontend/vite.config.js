import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite. El frontend consume la API mediante VITE_API_URL.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
