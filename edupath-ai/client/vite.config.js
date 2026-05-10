import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { 'framer-motion': resolve(__dirname, 'src/utils/framerMotionShim.jsx'), 'recharts': resolve(__dirname, 'src/utils/rechartsShim.jsx') } },
  server: { port: 5173 }
});
