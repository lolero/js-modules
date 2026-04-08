import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons/faHandsHoldingCircle';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import upperFirst from 'lodash/upperFirst';
import { WebModulesPublic } from '@js-modules/apps-dapp-common-constants';
import type { RoutesMetadata } from '@js-modules/common-react-nav';

export const routesMetadataPublic: RoutesMetadata<IconDefinition> = {
  [WebModulesPublic.home]: {
    path: `/${WebModulesPublic.home}`,
    icon: faHouse,
    label: upperFirst(WebModulesPublic.home),
  },
  [WebModulesPublic.purpose]: {
    path: `/${WebModulesPublic.purpose}`,
    icon: faHandsHoldingCircle,
    label: upperFirst(WebModulesPublic.purpose),
  },
};
