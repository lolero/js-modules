import { splitRouterPath } from '../utils/splitRouterPath';
import { useWebRouter } from './useWebRouter';

/**
 * Split the current path into its route segments, excluding query params.
 * @returns Array of router path parts.
 */
export function useSplitRouterPath(): string[] {
  const { pathname } = useWebRouter();

  return splitRouterPath(pathname);
}
