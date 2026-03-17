import { RoutesMetadata } from '@js-modules/common-react-nav';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import upperFirst from 'lodash/upperFirst';
import { faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons/faHandsHoldingCircle';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

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
