import { useSplitRouterPath } from '@js-modules/web-react-utils';
import { Modules } from '../types/segwayRentalWebTypes';

function useModule(): string {
  const splitRouterPath = useSplitRouterPath();

  const module = splitRouterPath[0] as Modules;

  return module;
}

export default useModule;
