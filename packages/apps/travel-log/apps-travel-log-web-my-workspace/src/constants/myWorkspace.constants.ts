import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
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
import { NavLeftDrawerTabsMetadata } from '@js-modules/web-react-nav';
import {
  MyModules,
  myModulesPaths,
  PublicModules,
  publicModulesPaths,
  SubModulesMyBoards,
  SubModulesMyFeeds,
  SubModulesMyLog,
  SubModulesMyNetwork,
} from '@js-modules/apps-travel-log-common-constants';

export const myWorkspaceNavDrawerTabsMetadata: NavLeftDrawerTabsMetadata = {
  [MyModules.myFeeds]: {
    tabPath: myModulesPaths[MyModules.myFeeds],
    icon: faRss,
    label: upperFirst(lowerCase(MyModules.myFeeds)),
    subTabs: {
      [SubModulesMyFeeds.general]: {
        tabPath: myModulesPaths[SubModulesMyFeeds.general],
        icon: faGlobe,
        label: upperFirst(lowerCase(SubModulesMyFeeds.general)),
      },
    },
  },
  [MyModules.myBoards]: {
    tabPath: myModulesPaths[MyModules.myBoards],
    icon: faPersonChalkboard,
    label: upperFirst(lowerCase(MyModules.myBoards)),
    subTabs: {
      [SubModulesMyBoards.public]: {
        tabPath: myModulesPaths[SubModulesMyBoards.public],
        icon: faGlobe,
        label: upperFirst(lowerCase(SubModulesMyBoards.public)),
      },
      // [SubModulesMyBoards.followers]: {
      //   tabPath: myModulesPaths[SubModulesMyBoards.followers],
      //   icon: faPersonArrowDownToLine,
      //   label: upperFirst(lowerCase(SubModulesMyBoards.followers)),
      // },
      // [SubModulesMyBoards.friends]: {
      //   tabPath: myModulesPaths[SubModulesMyBoards.friends],
      //   icon: faHandshake,
      //   label: upperFirst(lowerCase(SubModulesMyBoards.friends)),
      // },
    },
  },
  [MyModules.myLog]: {
    tabPath: myModulesPaths[MyModules.myLog],
    icon: faClipboardList,
    label: upperFirst(lowerCase(MyModules.myLog)),
    subTabs: {
      [SubModulesMyLog.trips]: {
        tabPath: myModulesPaths[SubModulesMyLog.trips],
        icon: faPlaneDeparture,
        label: upperFirst(lowerCase(SubModulesMyLog.trips)),
      },
      [SubModulesMyLog.dives]: {
        tabPath: myModulesPaths[SubModulesMyLog.dives],
        icon: faFish,
        label: upperFirst(lowerCase(SubModulesMyLog.dives)),
      },
    },
  },
  [MyModules.myNetwork]: {
    tabPath: myModulesPaths[MyModules.myNetwork],
    icon: faDiagramProject,
    label: upperFirst(lowerCase(MyModules.myNetwork)),
    subTabs: {
      [SubModulesMyNetwork.connections]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.connections],
        icon: faLink,
        label: upperFirst(lowerCase(SubModulesMyNetwork.connections)),
      },
      [SubModulesMyNetwork.friends]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.friends],
        icon: faHandshake,
        label: upperFirst(lowerCase(SubModulesMyNetwork.friends)),
      },
      [SubModulesMyNetwork.inPerson]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.inPerson],
        icon: faPeopleArrows,
        label: upperFirst(lowerCase(SubModulesMyNetwork.inPerson)),
      },
      [SubModulesMyNetwork.following]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.following],
        icon: faPersonArrowUpFromLine,
        label: upperFirst(lowerCase(SubModulesMyNetwork.following)),
      },
      [SubModulesMyNetwork.followers]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.followers],
        icon: faPersonArrowDownToLine,
        label: upperFirst(lowerCase(SubModulesMyNetwork.followers)),
      },
      [SubModulesMyNetwork.groups]: {
        tabPath: myModulesPaths[SubModulesMyNetwork.groups],
        icon: faPeopleGroup,
        label: upperFirst(lowerCase(SubModulesMyNetwork.groups)),
      },
    },
  },
  [PublicModules.home]: {
    tabPath: publicModulesPaths[PublicModules.home],
    icon: faHouse,
    label: upperFirst('visit homepage'),
  },
};
