import type { Plugin } from 'vite';

// Types for the `.mjs` plugin (authored as runtime JS so a consumer's vite
// config can load it in a Node context). See `docsMuiStaticAssets.mjs`.
export declare function docsMuiStaticAssets(): Plugin;
