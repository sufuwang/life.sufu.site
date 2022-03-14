import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

console.info('process.env.platform:', process.env.platform)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@root', replacement: path.resolve(__dirname, '.') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@const', replacement: path.resolve(__dirname, './src/const') },
    ]
  },
  server: {
    port: 3002
  },
  define: {
    ProcessEnvPlatform: JSON.stringify(process.env.platform)
  }
});
