import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons/faClipboardList';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faFish } from '@fortawesome/free-solid-svg-icons/faFish';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons/faPeopleArrows';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faPersonArrowDownToLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowDownToLine';
import { faPersonArrowUpFromLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowUpFromLine';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons/faPersonChalkboard';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faRss } from '@fortawesome/free-solid-svg-icons/faRss';
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import {
  WebModulesPrivate,
  WebModulesPublic,
  WebSubModulesBoards,
  WebSubModulesFeeds,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
  WebSubModulesNetwork,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import { routesMetadataPublic } from './routesMetadata.pubilc';

export const routesMetadataPrivate: RoutesMetadata<IconDefinition> = {
  [WebModulesPrivate.feeds]: {
    path: `/${WebModulesPrivate.feeds}`,
    icon: faRss,
    label: upperFirst(lowerCase(WebModulesPrivate.feeds)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesFeeds.general]: {
        path: `/${WebModulesPrivate.feeds}/${WebSubModulesFeeds.general}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(WebSubModulesFeeds.general)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.boards]: {
    path: `/${WebModulesPrivate.boards}`,
    icon: faPersonChalkboard,
    label: upperFirst(lowerCase(WebModulesPrivate.boards)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesBoards.public]: {
        path: `/${WebModulesPrivate.boards}/${WebSubModulesBoards.public}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(WebSubModulesBoards.public)),
        isProtected: true,
      },
      [WebSubModulesBoards.followers]: {
        path: `/${WebModulesPrivate.boards}/${WebSubModulesBoards.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(WebSubModulesBoards.followers)),
        isProtected: true,
      },
      [WebSubModulesBoards.friends]: {
        path: `/${WebModulesPrivate.boards}/${WebSubModulesBoards.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(WebSubModulesBoards.friends)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.log]: {
    path: `/${WebModulesPrivate.log}`,
    icon: faClipboardList,
    label: upperFirst(lowerCase(WebModulesPrivate.log)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesLog.logEntry]: {
        path: `/${WebModulesPrivate.log}/${WebSubModulesLog.logEntry}`,
        icon: faClipboard,
        label: upperFirst(lowerCase(WebSubModulesLog.logEntry)),
        isProtected: true,
        isHidden: true,
        subRoutes: {
          [WebSubModulesLogLogEntry.addNew]: {
            path: `/${WebModulesPrivate.log}/${WebSubModulesLog.logEntry}/${WebSubModulesLogLogEntry.addNew}`,
            icon: faPlus,
            label: upperFirst(lowerCase(WebSubModulesLogLogEntry.addNew)),
            isProtected: true,
            isHidden: true,
          },
          [WebSubModulesLogLogEntry.edit]: {
            path: `/${WebModulesPrivate.log}/${WebSubModulesLog.logEntry}/logEntryId/${WebSubModulesLogLogEntry.edit}`,
            icon: faUserPen,
            label: upperFirst(lowerCase(WebSubModulesLogLogEntry.edit)),
            isProtected: true,
            isHidden: true,
          },
        },
      },
      [WebSubModulesLog.trips]: {
        path: `/${WebModulesPrivate.log}/${WebSubModulesLog.trips}`,
        icon: faPlaneDeparture,
        label: upperFirst(lowerCase(WebSubModulesLog.trips)),
        isProtected: true,
      },
      [WebSubModulesLog.dives]: {
        path: `/${WebModulesPrivate.log}/${WebSubModulesLog.dives}`,
        icon: faFish,
        label: upperFirst(lowerCase(WebSubModulesLog.dives)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.network]: {
    path: `/${WebModulesPrivate.network}`,
    icon: faDiagramProject,
    label: upperFirst(lowerCase(WebModulesPrivate.network)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesNetwork.connections]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.connections}`,
        icon: faLink,
        label: upperFirst(lowerCase(WebSubModulesNetwork.connections)),
        isProtected: true,
      },
      [WebSubModulesNetwork.friends]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(WebSubModulesNetwork.friends)),
        isProtected: true,
      },
      [WebSubModulesNetwork.inPerson]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.inPerson}`,
        icon: faPeopleArrows,
        label: upperFirst(lowerCase(WebSubModulesNetwork.inPerson)),
        isProtected: true,
      },
      [WebSubModulesNetwork.following]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.following}`,
        icon: faPersonArrowUpFromLine,
        label: upperFirst(lowerCase(WebSubModulesNetwork.following)),
        isProtected: true,
      },
      [WebSubModulesNetwork.followers]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(WebSubModulesNetwork.followers)),
        isProtected: true,
      },
      [WebSubModulesNetwork.groups]: {
        path: `/${WebModulesPrivate.network}/${WebSubModulesNetwork.groups}`,
        icon: faPeopleGroup,
        label: upperFirst(lowerCase(WebSubModulesNetwork.groups)),
        isProtected: true,
      },
    },
  },
  [WebModulesPublic.home]: routesMetadataPublic[WebModulesPublic.home],
  [WebModulesPrivate.settings]: {
    path: `/${WebModulesPrivate.settings}`,
    icon: faGear,
    label: upperFirst(lowerCase(WebModulesPrivate.settings)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesSettings.profile]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.profile}`,
        icon: faAddressCard,
        label: upperFirst(lowerCase(WebSubModulesSettings.profile)),
        isProtected: true,
        subRoutes: {
          [WebSubModulesSettingsProfile.edit]: {
            path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.profile}/${WebSubModulesSettingsProfile.edit}`,
            icon: faUserPen,
            label: upperFirst(lowerCase(WebSubModulesSettingsProfile.edit)),
            isProtected: true,
            isHidden: true,
          },
        },
      },
      [WebSubModulesSettings.account]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.account}`,
        icon: faFileInvoice,
        label: upperFirst(lowerCase(WebSubModulesSettings.account)),
        isProtected: true,
      },
      [WebSubModulesSettings.billing]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.billing}`,
        icon: faWallet,
        label: upperFirst(lowerCase(WebSubModulesSettings.billing)),
        isProtected: true,
      },
      [WebSubModulesSettings.privacy]: {
        path: `/${WebModulesPrivate.settings}/${WebSubModulesSettings.privacy}`,
        icon: faUserSecret,
        label: upperFirst(lowerCase(WebSubModulesSettings.privacy)),
        isProtected: true,
      },
    },
  },
};
