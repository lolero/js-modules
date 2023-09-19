import { RoutesMetadata } from '@js-modules/web-react-nav';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';
import { faRss } from '@fortawesome/free-solid-svg-icons/faRss';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons/faPersonChalkboard';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons/faClipboardList';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons/faPlaneDeparture';
import { faFish } from '@fortawesome/free-solid-svg-icons/faFish';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons/faPeopleArrows';
import { faPersonArrowUpFromLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowUpFromLine';
import { faPersonArrowDownToLine } from '@fortawesome/free-solid-svg-icons/faPersonArrowDownToLine';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons/faHandsHoldingCircle';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faUserPen } from '@fortawesome/free-solid-svg-icons/faUserPen';
import {
  WebModulesPrivate,
  WebModulesPublic,
  WebSubModulesMyBoards,
  WebSubModulesMyFeeds,
  WebSubModulesMyLog,
  WebSubModulesMyNetwork,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from './modules.constants';

export const modulesPublicRoutesMetadata: RoutesMetadata = {
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

export const modulesPrivateRoutesMetadata: RoutesMetadata = {
  [WebModulesPrivate.myFeeds]: {
    path: `/${WebModulesPrivate.myFeeds}`,
    icon: faRss,
    label: upperFirst(lowerCase(WebModulesPrivate.myFeeds)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyFeeds.general]: {
        path: `/${WebModulesPrivate.myFeeds}/${WebSubModulesMyFeeds.general}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(WebSubModulesMyFeeds.general)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myBoards]: {
    path: `/${WebModulesPrivate.myBoards}`,
    icon: faPersonChalkboard,
    label: upperFirst(lowerCase(WebModulesPrivate.myBoards)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyBoards.public]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.public}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.public)),
        isProtected: true,
      },
      [WebSubModulesMyBoards.followers]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.followers)),
        isProtected: true,
      },
      [WebSubModulesMyBoards.friends]: {
        path: `/${WebModulesPrivate.myBoards}/${WebSubModulesMyBoards.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(WebSubModulesMyBoards.friends)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myLog]: {
    path: `/${WebModulesPrivate.myLog}`,
    icon: faClipboardList,
    label: upperFirst(lowerCase(WebModulesPrivate.myLog)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyLog.trips]: {
        path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.trips}`,
        icon: faPlaneDeparture,
        label: upperFirst(lowerCase(WebSubModulesMyLog.trips)),
        isProtected: true,
      },
      [WebSubModulesMyLog.dives]: {
        path: `/${WebModulesPrivate.myLog}/${WebSubModulesMyLog.dives}`,
        icon: faFish,
        label: upperFirst(lowerCase(WebSubModulesMyLog.dives)),
        isProtected: true,
      },
    },
  },
  [WebModulesPrivate.myNetwork]: {
    path: `/${WebModulesPrivate.myNetwork}`,
    icon: faDiagramProject,
    label: upperFirst(lowerCase(WebModulesPrivate.myNetwork)),
    isProtected: true,
    subRoutes: {
      [WebSubModulesMyNetwork.connections]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.connections}`,
        icon: faLink,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.connections)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.friends]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.friends)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.inPerson]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.inPerson}`,
        icon: faPeopleArrows,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.inPerson)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.following]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.following}`,
        icon: faPersonArrowUpFromLine,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.following)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.followers]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.followers)),
        isProtected: true,
      },
      [WebSubModulesMyNetwork.groups]: {
        path: `/${WebModulesPrivate.myNetwork}/${WebSubModulesMyNetwork.groups}`,
        icon: faPeopleGroup,
        label: upperFirst(lowerCase(WebSubModulesMyNetwork.groups)),
        isProtected: true,
      },
    },
  },
  [WebModulesPublic.home]: modulesPublicRoutesMetadata[WebModulesPublic.home],
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
