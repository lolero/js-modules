export type RoutesMetadata<IconT = any> = Record<string, RouteMetadata<IconT>>;

export type RouteMetadata<IconT = any> = {
  path: string;
  icon: IconT;
  label: string;
  isProtected?: boolean;
  roles?: string[];
  isHidden?: boolean;
  keepQueryParamsKeys?: string[];
  subRoutes?: RoutesMetadata<IconT>;
};
