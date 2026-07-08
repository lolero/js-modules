import noop from 'lodash/noop';
import { createContext, createElement } from 'react';
import type { WebRouterAdapter } from '../types/webRouter.types';

export const WebRouterContext = createContext<WebRouterAdapter>({
  // Framework-agnostic fallback used when no router implementation provider
  // wraps the tree; renders a plain anchor and no-ops programmatic navigation.
  LinkComponent: ({ href, ...rest }) => createElement('a', { href, ...rest }),
  pathname: '/',
  searchParams: new URLSearchParams(),
  setSearchParams: noop,
  useParams: () => ({}),
  pathPush: noop,
  pathReplace: noop,
  back: noop,
});
