import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      fallback: 'index.html', // may differ from host to host
    }),

    // This app's tsconfig extends the generated `.svelte-kit/tsconfig.json`
    // rather than the root one, so workspace path aliases must be declared here
    // https://svelte.dev/docs/kit/configuration#alias
    alias: {
      $c: 'src/components',
      $s: 'src/store',
      $api: 'src/api/axios.js',
      '@js-modules/common-utils-general':
        '../../../common/utils/common-utils-general/src',
    },
  },
};

export default config;
