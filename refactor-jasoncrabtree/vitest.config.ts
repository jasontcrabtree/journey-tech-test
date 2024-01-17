import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/*'],
      exclude: [
        //   We exclude standard NextJS core pages as they aren't running any custom logic
        'src/pages/_app.tsx',
        'src/pages/_document.tsx',
      ],
    },
  },
});
