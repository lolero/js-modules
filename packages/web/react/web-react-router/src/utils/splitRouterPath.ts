import { last } from 'lodash';

/**
 * Split a URL pathname into its route segments, dropping a trailing slash and
 * any hash or query-param suffix on the final segment.
 * @param pathname - URL pathname to split.
 * @returns Array of router path parts.
 */
export function splitRouterPath(pathname: string): string[] {
  const pathSegments = pathname.split('/').slice(1);
  if (last(pathSegments) === '') {
    pathSegments.splice(-1);
  }

  let lastPath = last(pathSegments)?.split('#')[0] ?? null;
  if (lastPath) {
    pathSegments[pathSegments.length - 1] = lastPath;
  }

  lastPath = last(pathSegments)?.split('?')[0] ?? null;
  if (lastPath) {
    pathSegments[pathSegments.length - 1] = lastPath;
  }

  return pathSegments;
}
