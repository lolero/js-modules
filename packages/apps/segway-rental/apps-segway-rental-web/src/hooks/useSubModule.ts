import { useSplitRouterPath } from '@js-modules/web-react-utils';
import {
  SubModulesHome,
  SubModulesLocations,
} from '../types/segwayRentalWebTypes';

function useSubModule(): string {
  const splitRouterPath = useSplitRouterPath();

  const module = splitRouterPath[1] as SubModulesHome | SubModulesLocations;

  return module;
}

export default useSubModule;
