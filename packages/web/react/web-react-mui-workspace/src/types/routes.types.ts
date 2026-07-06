import type { Location, NavigateFunction } from 'react-router-dom';

export type ReactRouterNavUtils = {
  navigate: NavigateFunction;
  location: Location;
  searchParams: URLSearchParams;
};
