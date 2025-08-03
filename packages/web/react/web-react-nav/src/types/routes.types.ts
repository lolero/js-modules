import React from 'react';
import { Location, NavigateFunction } from 'react-router-dom';

export type RoutesMetadata = Record<string, RouteMetadata>;

export type RouteMetadata = {
  path: string;
  icon: React.ReactElement;
  label: string;
  isProtected?: boolean;
  roles?: string[];
  isHidden?: boolean;
  keepQueryParamsKeys?: string[];
  subRoutes?: RoutesMetadata;
};

export type ReactRouterNavUtils = {
  navigate: NavigateFunction;
  location: Location;
  searchParams: URLSearchParams;
};
