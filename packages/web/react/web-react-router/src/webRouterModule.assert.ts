import * as moduleNext from './next';
import * as moduleReactRouter from './reactRouter';
import type { WebRouterModule } from './types/webRouter.types';

/**
 * Compile-time proof that both router-implementation subpaths expose the shared
 * {@link WebRouterModule} contract, keeping `./react-router` and `./next` in
 * lockstep. A drifted or mistyped export fails the build here.
 *
 * IMPORTANT: this is the one file that imports both subpaths, so it pulls in
 * both `react-router-dom` and `next`. Keep it standalone — never re-export it
 * from `index.ts` or expose it via `package.json` `exports`, or the core `.`
 * entry would lose its router isolation. Nothing imports it; it exists solely
 * to be type-checked.
 */
const _mirrorNext: WebRouterModule = moduleNext;
const _mirrorReactRouter: WebRouterModule = moduleReactRouter;
