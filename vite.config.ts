/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }, { find: '@svg', replacement: path.resolve(__dirname, 'assets/svg') }],
  },
  plugins: [svgr(), react()],
  base: '/TestTask',
});
