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
        // TS files are imported into react components and tested there, or via static type checking (e.g. types.ts)
        'src/**/types.ts', // Type file
        'src/**/products.ts', // API route fetching data, given more time would be tested with a mock server

        //   We exclude standard NextJS core pages as they aren't running any custom logic
        'src/pages/_app.tsx',
        'src/pages/_document.tsx',
      ],
    },
  },
});
