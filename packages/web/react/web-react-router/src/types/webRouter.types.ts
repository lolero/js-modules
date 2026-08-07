import type React from 'react';

export type WebRouterLinkProps = {
  href: string;
} & Omit<React.ComponentPropsWithRef<'a'>, 'href'>;

export type WebRouterLinkComponent = React.ComponentType<WebRouterLinkProps>;

export type WebRouterProviderProps = {
  children: React.ReactNode;
};

export type WebRouterProviderComponent = React.FC<WebRouterProviderProps>;

export type WebRouterParams = Record<string, string | undefined>;

/**
 * The framework's route-params hook, carried on the adapter and called by
 * consumers at their own position in the tree — route params are match-scoped,
 * so they can't be a top-level value on the provider. Consume via
 * `useWebParams()`, which normalizes the shape. Next's catch-all params can be
 * `string[]`, hence the wider return.
 */
export type WebRouterUseParams = () => Readonly<
  Record<string, string | string[] | undefined>
>;

/**
 * Router-agnostic search-params setter — accepts a next value or an updater,
 * mirroring react-router's `setSearchParams` and a Next `router.push`-based
 * adapter alike.
 */
export type WebRouterSetSearchParams = (
  params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
) => void;

/**
 * Framework-agnostic routing surface consumed by web packages (e.g. the nav
 * workspace). A router implementation supplies this via <WebRouterContext />;
 * see the `./react-router` and `./next` subpath entries.
 */
export type WebRouterAdapter = {
  LinkComponent: WebRouterLinkComponent;
  pathname: string;
  searchParams: URLSearchParams;
  setSearchParams: WebRouterSetSearchParams;
  useParams: WebRouterUseParams;
  pathPush: (path: string) => void;
  pathReplace: (path: string) => void;
  back: () => void;
};

/**
 * The named-export contract every router implementation subpath must mirror, so
 * `@js-modules/web-react-router/react-router` and `.../next` stay in lockstep.
 */
export type WebRouterModule = {
  WebRouterProvider: WebRouterProviderComponent;
  WebRouterLink: WebRouterLinkComponent;
};
