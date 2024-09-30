import React from 'react';
import { RoutesMetadata } from '@js-modules/web-react-nav';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import upperFirst from 'lodash/upperFirst';
import { faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons/faHandsHoldingCircle';

export const routesMetadataPublic: RoutesMetadata = {
  [WebModulesPublic.home]: {
    path: `/${WebModulesPublic.home}`,
    icon: <MuiFaIcon icon={faHouse} />,
    label: upperFirst(WebModulesPublic.home),
  },
  [WebModulesPublic.purpose]: {
    path: `/${WebModulesPublic.purpose}`,
    icon: <MuiFaIcon icon={faHandsHoldingCircle} />,
    label: upperFirst(WebModulesPublic.purpose),
  },
};
