import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/student-mark-backend/', // Ensure correct base path
  build: {
    outDir: 'docs', // Change output directory to docs/
  },
});
