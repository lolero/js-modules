'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import type React from 'react';
import { Suspense, useCallback, useMemo } from 'react';
import { WebRouterContext } from '../contexts/WebRouterContext';
import type {
  WebRouterAdapter,
  WebRouterProviderProps,
  WebRouterSetSearchParams,
} from '../types/webRouter.types';
import { WebRouterLink } from './WebRouterLink';

/**
 * Reads Next.js navigation primitives and supplies the web router adapter. Kept
 * separate from <WebRouterProvider /> so `useSearchParams` sits under the
 * Suspense boundary Next.js requires.
 * @param props - Component props.
 * @param props.children - Subtree that consumes the web router adapter.
 * @returns The provider wrapping `children`.
 */
function WebRouterProviderInner({
  children,
}: WebRouterProviderProps): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();

  // WHY: react-compiler-hook-as-value
  // `useParams` rides on the adapter below, so this component is never compiled.
  const searchParams = useMemo(() => {
    return new URLSearchParams(nextSearchParams.toString());
  }, [nextSearchParams]);

  const pathPush = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const pathReplace = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router],
  );

  const setSearchParams = useCallback<WebRouterSetSearchParams>(
    (params) => {
      const nextParams =
        typeof params === 'function'
          ? params(new URLSearchParams(nextSearchParams.toString()))
          : params;
      const query = nextParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [nextSearchParams, pathname, router],
  );

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const webRouterAdapter: WebRouterAdapter = useMemo(() => {
    return {
      LinkComponent: WebRouterLink,
      pathname,
      searchParams,
      setSearchParams,
      useParams,
      pathPush,
      pathReplace,
      back,
    };
  }, [pathname, searchParams, setSearchParams, pathPush, pathReplace, back]);

  return (
    <WebRouterContext.Provider value={webRouterAdapter}>
      {children}
    </WebRouterContext.Provider>
  );
}

/**
 * Supplies <WebRouterContext /> from Next.js's App Router primitives so
 * router-agnostic consumers (e.g. the nav workspace) navigate through Next.js.
 * Owns the Suspense boundary Next.js requires around `useSearchParams`.
 * @param props - Component props.
 * @param props.children - Subtree that consumes the web router adapter.
 * @returns The provider wrapping `children`.
 */
export function WebRouterProvider({
  children,
}: WebRouterProviderProps): React.ReactNode {
  return (
    <Suspense>
      <WebRouterProviderInner>{children}</WebRouterProviderInner>
    </Suspense>
  );
}
