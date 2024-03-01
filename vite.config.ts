import { UserConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const vitestConfig: UserConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
};

const viteConfig: UserConfig = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react()],
};

// https://vitejs.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    ...vitestConfig,
  }),
);
