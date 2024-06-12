import React from 'react';

export type RoutesMetadata = Record<string, RouteMetadata>;

export type RouteMetadata = {
  path: string;
  icon: React.ReactElement;
  label: string;
  isProtected?: boolean;
  roles?: string[];
  isHidden?: boolean;
  subRoutes?: RoutesMetadata;
};
