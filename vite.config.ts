import { UserConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
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
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ReactModalPriority',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
};

// https://vitejs.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    ...vitestConfig,
  }),
);
