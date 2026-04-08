export type RoutesMetadata<IconT> = Record<string, RouteMetadata<IconT>>;

export type RouteMetadata<IconT> = {
  path: string;
  icon: IconT;
  label: string;
  isProtected?: boolean;
  roles?: string[];
  isHidden?: boolean;
  keepQueryParamsKeys?: string[];
  subRoutes?: RoutesMetadata<IconT>;
};
