import { useContext } from 'react';
import { WebRouterContext } from '../contexts/WebRouterContext';
import type { WebRouterAdapter } from '../types/webRouter.types';

/**
 * Access the framework-agnostic router adapter supplied by the active router
 * implementation provider (react-router or next).
 * @returns The current <WebRouterContext /> value.
 */
export function useWebRouter(): WebRouterAdapter {
  return useContext(WebRouterContext);
}
