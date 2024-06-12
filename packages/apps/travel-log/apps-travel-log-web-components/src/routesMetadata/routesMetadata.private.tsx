import { RoutesMetadata } from '@js-modules/web-react-nav';
import {
  WebModulesPrivate,
  WebModulesPublic,
  WebSubModulesMyBoards,
  WebSubModulesMyFeeds,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
  WebSubModulesMyNetwork,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faRss } from '@fortawesome/free-solid-svg-icons/faRss';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons/faPersonChalkboard';
import { faPersonArrowDownToLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowDownToLine';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons/faClipboardList';
import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';
import { faFish } from '@fortawesome/free-solid-svg-icons/faFish';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons/faPeopleArrows';
import { faPersonArrowUpFromLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowUpFromLine';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import React from 'react';
import { routesMetadataPublic } from './routesMetadata.pubilc';

export const routesMetadataPrivate: RoutesMetadata = {
  [WebModulesPrivate.myFeeds]: {
    path: `/${WebModulesPrivate.myFeeds}`,
    icon: <MuiFaIcon icon={faRss} />,
    label: upperFirst(lowerCase(WebModulesPrivate.myFeeds)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyFeeds.general]: {
        path: `/${WebModulesPrivate.myFeeds}/${WebSubModulesMyFeeds.general}`,
        icon: <MuiFaIcon icon={faGlobe} />,
        label: upperFirst(lowerCase(WebSubModulesMyFeeds.general)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myBoards]: {
    path: `/${WebModulesPrivate.myBoards}`,
    icon: <MuiFaIcon icon={faPersonChalkboard} />,
    label: upperFirst(lowerCase(WebModulesPrivate.myBoards)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyBoards.public]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.public}`,
        icon: <MuiFaIcon icon={faGlobe} />,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.public)),
        isProtected: true,
      },
      [WebSubModulesMyBoards.followers]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.followers}`,
        icon: <MuiFaIcon icon={faPersonArrowDownToLine} />,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.followers)),
        isProtected: true,
      },
      [WebSubModulesMyBoards.friends]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.friends}`,
        icon: <MuiFaIcon icon={faHandshake} />,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.friends)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myLog]: {
    path: `/${WebModulesPrivate.myLog}`,
    icon: <MuiFaIcon icon={faClipboardList} />,
    label: upperFirst(lowerCase(WebModulesPrivate.myLog)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyLog.logEntry]: {
        path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.logEntry}`,
        icon: <MuiFaIcon icon={faClipboard} />,
        label: upperFirst(lowerCase(WebSubModulesMyLog.logEntry)),
        isProtected: true,
        isHidden: true,
        subRoutes: {
          [WebSubModulesMyLogLogEntry.addNew]: {
            path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.logEntry}/${WebSubModulesMyLogLogEntry.addNew}`,
            icon: <MuiFaIcon icon={faPlus} />,
            label: upperFirst(lowerCase(WebSubModulesMyLogLogEntry.addNew)),
            isProtected: true,
            isHidden: true,
          },
          [WebSubModulesMyLogLogEntry.edit]: {
            path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.logEntry}/logEntryId/${WebSubModulesMyLogLogEntry.edit}`,
            icon: <MuiFaIcon icon={faUserPen} />,
            label: upperFirst(lowerCase(WebSubModulesMyLogLogEntry.edit)),
            isProtected: true,
            isHidden: true,
          },
        },
      },
      [WebSubModulesMyLog.trips]: {
        path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.trips}`,
        icon: <MuiFaIcon icon={faPlaneDeparture} />,
        label: upperFirst(lowerCase(WebSubModulesMyLog.trips)),
        isProtected: true,
      },
      [WebSubModulesMyLog.dives]: {
        path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.dives}`,
        icon: <MuiFaIcon icon={faFish} />,
        label: upperFirst(lowerCase(WebSubModulesMyLog.dives)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myNetwork]: {
    path: `/${WebModulesPrivate.myNetwork}`,
    icon: <MuiFaIcon icon={faDiagramProject} />,
    label: upperFirst(lowerCase(WebModulesPrivate.myNetwork)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyNetwork.connections]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.connections}`,
        icon: <MuiFaIcon icon={faLink} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.connections)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.friends]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.friends}`,
        icon: <MuiFaIcon icon={faHandshake} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.friends)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.inPerson]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.inPerson}`,
        icon: <MuiFaIcon icon={faPeopleArrows} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.inPerson)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.following]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.following}`,
        icon: <MuiFaIcon icon={faPersonArrowUpFromLine} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.following)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.followers]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.followers}`,
        icon: <MuiFaIcon icon={faPersonArrowDownToLine} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.followers)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.groups]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.groups}`,
        icon: <MuiFaIcon icon={faPeopleGroup} />,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.groups)),
        isProtected: true,
      },
    },
  },
  [WebModulesPublic.home]: routesMetadataPublic[WebModulesPublic.home],
  [WebModulesPrivate.settings]: {
    path: `/${WebModulesPrivate.settings}`,
    icon: <MuiFaIcon icon={faGear} />,
    label: upperFirst(lowerCase(WebModulesPrivate.settings)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesSettings.profile]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.profile}`,
        icon: <MuiFaIcon icon={faAddressCard} />,
        label: upperFirst(lowerCase(WebSubModulesSettings.profile)),
        isProtected: true,
        subRoutes: {
          [WebSubModulesSettingsProfile.edit]: {
            path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.profile}/${WebSubModulesSettingsProfile.edit}`,
            icon: <MuiFaIcon icon={faUserPen} />,
            label: upperFirst(lowerCase(WebSubModulesSettingsProfile.edit)),
            isProtected: true,
            isHidden: true,
          },
        },
      },
      [WebSubModulesSettings.account]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.account}`,
        icon: <MuiFaIcon icon={faFileInvoice} />,
        label: upperFirst(lowerCase(WebSubModulesSettings.account)),
        isProtected: true,
      },
      [WebSubModulesSettings.billing]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.billing}`,
        icon: <MuiFaIcon icon={faWallet} />,
        label: upperFirst(lowerCase(WebSubModulesSettings.billing)),
        isProtected: true,
      },
      [WebSubModulesSettings.privacy]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.privacy}`,
        icon: <MuiFaIcon icon={faUserSecret} />,
        label: upperFirst(lowerCase(WebSubModulesSettings.privacy)),
        isProtected: true,
      },
    },
  },
};
