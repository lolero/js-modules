import { last } from 'lodash';
import { useLocation } from 'react-router-dom';

/**
 * Split the router path, excluding query params
 *
 * @returns {string[]} Array of router path parts
 */
function useSplitRouterPath(): string[] {
  const { pathname } = useLocation();

  const splitRouterPath = pathname.split('/').slice(1);
  if (last(splitRouterPath) === '') {
    splitRouterPath.splice(-1);
  }

  let lastPath = last(splitRouterPath)?.split('#')[0] ?? null;
  if (lastPath) {
    splitRouterPath[splitRouterPath.length - 1] = lastPath;
  }

  lastPath = last(splitRouterPath)?.split('?')[0] ?? null;
  if (lastPath) {
    splitRouterPath[splitRouterPath.length - 1] = lastPath;
  }

  return splitRouterPath;
}

export default useSplitRouterPath;
