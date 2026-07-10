import type React from 'react';
import { useCallback, useMemo } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { WebRouterContext } from '../contexts/WebRouterContext';
import type {
  WebRouterAdapter,
  WebRouterProviderProps,
  WebRouterSetSearchParams,
} from '../types/webRouter.types';
import { WebRouterLink } from './WebRouterLink';

/**
 * Supplies <WebRouterContext /> from react-router primitives so router-agnostic
 * consumers (e.g. the nav workspace) navigate through react-router. Render
 * inside a react-router <Router />.
 * @param props - Component props.
 * @param props.children - Subtree that consumes the web router adapter.
 * @returns The provider wrapping `children`.
 */
export function WebRouterProvider({
  children,
}: WebRouterProviderProps): React.ReactNode {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setReactRouterSearchParams] = useSearchParams();

  const pathPush = useCallback(
    (path: string) => {
      void navigate(path);
    },
    [navigate],
  );

  const pathReplace = useCallback(
    (path: string) => {
      void navigate(path, { replace: true });
    },
    [navigate],
  );

  const setSearchParams = useCallback<WebRouterSetSearchParams>(
    (params) => {
      setReactRouterSearchParams(params);
    },
    [setReactRouterSearchParams],
  );

  const back = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  const webRouterAdapter: WebRouterAdapter = useMemo(() => {
    return {
      LinkComponent: WebRouterLink,
      pathname: location.pathname,
      searchParams,
      setSearchParams,
      useParams,
      pathPush,
      pathReplace,
      back,
    };
  }, [
    location.pathname,
    searchParams,
    setSearchParams,
    pathPush,
    pathReplace,
    back,
  ]);

  return (
    <WebRouterContext.Provider value={webRouterAdapter}>
      {children}
    </WebRouterContext.Provider>
  );
}
