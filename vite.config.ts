import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Is this invoked using the storybook cli
const isStorybookBuild = process.argv[1].endsWith('storybook');
const includeReactRouterPlugin =
  !isStorybookBuild && process.env.NODE_ENV !== 'test';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    // The react-router plugin requires there be a vite.config.ts in PWD
    // When running storybook build, PWD is .storybook, so this will error out
    ...(includeReactRouterPlugin ? [reactRouter()] : []),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-utils/setup.ts'],
  },
});
