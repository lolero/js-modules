import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type RoutesMetadata = Record<string, RouteMetadata>;

export type RouteMetadata = {
  path: string;
  icon: IconDefinition;
  label: string;
  isProtected?: boolean;
  roles?: string[];
  isHidden?: boolean;
  subRoutes?: RoutesMetadata;
};
