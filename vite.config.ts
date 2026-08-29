import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { catalogApi } from './server/catalogApi';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), catalogApi()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  }
});
