import { useMemo } from 'react';
import type { WebRouterParams } from '../types/webRouter.types';
import { useWebRouter } from './useWebRouter';

/**
 * Current route params, framework-agnostic. Calls the active router adapter's
 * route-params hook at the consumer's position in the tree and normalizes the
 * result (Next catch-all `string[]` params collapse to their first segment).
 * @returns The current route's params keyed by name.
 */
export function useWebParams(): WebRouterParams {
  const { useParams } = useWebRouter();
  const params = useParams();

  return useMemo(() => {
    const webParams: WebRouterParams = {};
    for (const key of Object.keys(params)) {
      const value = params[key];
      webParams[key] = Array.isArray(value) ? value[0] : value;
    }
    return webParams;
  }, [params]);
}
