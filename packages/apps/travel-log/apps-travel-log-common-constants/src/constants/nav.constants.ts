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
  MyModules,
  PublicModules,
  SubModulesMyBoards,
  SubModulesMyFeeds,
  SubModulesMyLog,
  SubModulesMyNetwork,
  SubModulesSettings,
  SubModulesSettingsProfile,
} from './modules.constants';

export const publicModulesRoutesMetadata: RoutesMetadata = {
  [PublicModules.home]: {
    path: `/${PublicModules.home}`,
    icon: faHouse,
    label: upperFirst(PublicModules.home),
  },
  [PublicModules.purpose]: {
    path: `/${PublicModules.purpose}`,
    icon: faHandsHoldingCircle,
    label: upperFirst(PublicModules.purpose),
  },
};

export const myModulesRoutesMetadata: RoutesMetadata = {
  [MyModules.myFeeds]: {
    path: `/${MyModules.myFeeds}`,
    icon: faRss,
    label: upperFirst(lowerCase(MyModules.myFeeds)),
    isProtected: true,
    subRoutes: {
      [SubModulesMyFeeds.general]: {
        path: `/${MyModules.myFeeds}/${SubModulesMyFeeds.general}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(SubModulesMyFeeds.general)),
        isProtected: true,
      },
    },
  },
  [MyModules.myBoards]: {
    path: `/${MyModules.myBoards}`,
    icon: faPersonChalkboard,
    label: upperFirst(lowerCase(MyModules.myBoards)),
    isProtected: true,
    subRoutes: {
      [SubModulesMyBoards.public]: {
        path: `/${MyModules.myBoards}/${SubModulesMyBoards.public}`,
        icon: faGlobe,
        label: upperFirst(lowerCase(SubModulesMyBoards.public)),
        isProtected: true,
      },
      [SubModulesMyBoards.followers]: {
        path: `/${MyModules.myBoards}/${SubModulesMyBoards.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(SubModulesMyBoards.followers)),
        isProtected: true,
      },
      [SubModulesMyBoards.friends]: {
        path: `/${MyModules.myBoards}/${SubModulesMyBoards.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(SubModulesMyBoards.friends)),
        isProtected: true,
      },
    },
  },
  [MyModules.myLog]: {
    path: `/${MyModules.myLog}`,
    icon: faClipboardList,
    label: upperFirst(lowerCase(MyModules.myLog)),
    isProtected: true,
    subRoutes: {
      [SubModulesMyLog.trips]: {
        path: `/${MyModules.myLog}/${SubModulesMyLog.trips}`,
        icon: faPlaneDeparture,
        label: upperFirst(lowerCase(SubModulesMyLog.trips)),
        isProtected: true,
      },
      [SubModulesMyLog.dives]: {
        path: `/${MyModules.myLog}/${SubModulesMyLog.dives}`,
        icon: faFish,
        label: upperFirst(lowerCase(SubModulesMyLog.dives)),
        isProtected: true,
      },
    },
  },
  [MyModules.myNetwork]: {
    path: `/${MyModules.myNetwork}`,
    icon: faDiagramProject,
    label: upperFirst(lowerCase(MyModules.myNetwork)),
    isProtected: true,
    subRoutes: {
      [SubModulesMyNetwork.connections]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.connections}`,
        icon: faLink,
        label: upperFirst(lowerCase(SubModulesMyNetwork.connections)),
        isProtected: true,
      },
      [SubModulesMyNetwork.friends]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.friends}`,
        icon: faHandshake,
        label: upperFirst(lowerCase(SubModulesMyNetwork.friends)),
        isProtected: true,
      },
      [SubModulesMyNetwork.inPerson]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.inPerson}`,
        icon: faPeopleArrows,
        label: upperFirst(lowerCase(SubModulesMyNetwork.inPerson)),
        isProtected: true,
      },
      [SubModulesMyNetwork.following]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.following}`,
        icon: faPersonArrowUpFromLine,
        label: upperFirst(lowerCase(SubModulesMyNetwork.following)),
        isProtected: true,
      },
      [SubModulesMyNetwork.followers]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.followers}`,
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(SubModulesMyNetwork.followers)),
        isProtected: true,
      },
      [SubModulesMyNetwork.groups]: {
        path: `/${MyModules.myNetwork}/${SubModulesMyNetwork.groups}`,
        icon: faPeopleGroup,
        label: upperFirst(lowerCase(SubModulesMyNetwork.groups)),
        isProtected: true,
      },
    },
  },
  [PublicModules.home]: publicModulesRoutesMetadata[PublicModules.home],
  [MyModules.settings]: {
    path: `/${MyModules.settings}`,
    icon: faGear,
    label: upperFirst(lowerCase(MyModules.settings)),
    isProtected: true,
    subRoutes: {
      [SubModulesSettings.profile]: {
        path: `/${MyModules.settings}/${SubModulesSettings.profile}`,
        icon: faAddressCard,
        label: upperFirst(lowerCase(SubModulesSettings.profile)),
        isProtected: true,
        subRoutes: {
          [SubModulesSettingsProfile.edit]: {
            path: `/${MyModules.settings}/${SubModulesSettings.profile}/${SubModulesSettingsProfile.edit}`,
            icon: faUserPen,
            label: upperFirst(lowerCase(SubModulesSettingsProfile.edit)),
            isProtected: true,
          },
        },
      },
      [SubModulesSettings.account]: {
        path: `/${MyModules.settings}/${SubModulesSettings.account}`,
        icon: faFileInvoice,
        label: upperFirst(lowerCase(SubModulesSettings.account)),
        isProtected: true,
      },
      [SubModulesSettings.billing]: {
        path: `/${MyModules.settings}/${SubModulesSettings.billing}`,
        icon: faWallet,
        label: upperFirst(lowerCase(SubModulesSettings.billing)),
        isProtected: true,
      },
      [SubModulesSettings.privacy]: {
        path: `/${MyModules.settings}/${SubModulesSettings.privacy}`,
        icon: faUserSecret,
        label: upperFirst(lowerCase(SubModulesSettings.privacy)),
        isProtected: true,
      },
    },
  },
};
