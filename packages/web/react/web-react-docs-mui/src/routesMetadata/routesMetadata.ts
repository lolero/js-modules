import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { fa1 } from '@fortawesome/free-solid-svg-icons/fa1';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons/faArrowDownShortWide';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons/faArrowsLeftRight';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons/faBorderAll';
import { faBraille } from '@fortawesome/free-solid-svg-icons/faBraille';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCertificate } from '@fortawesome/free-solid-svg-icons/faCertificate';
import { faChartArea } from '@fortawesome/free-solid-svg-icons/faChartArea';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons/faChartColumn';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faChartPie } from '@fortawesome/free-solid-svg-icons/faChartPie';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons/faCircleDot';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons/faCircleHalfStroke';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons/faCircleNodes';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faCompass } from '@fortawesome/free-solid-svg-icons/faCompass';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons/faDiagramProject';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faFire } from '@fortawesome/free-solid-svg-icons/faFire';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faFolderTree } from '@fortawesome/free-solid-svg-icons/faFolderTree';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faGauge } from '@fortawesome/free-solid-svg-icons/faGauge';
import { faGrip } from '@fortawesome/free-solid-svg-icons/faGrip';
import { faGripLines } from '@fortawesome/free-solid-svg-icons/faGripLines';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons/faHandPointer';
import { faIcons } from '@fortawesome/free-solid-svg-icons/faIcons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons/faIdCard';
import { faImages } from '@fortawesome/free-solid-svg-icons/faImages';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons/faKeyboard';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons/faMoneyBillTrendUp';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons/faSkullCrossbones';
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faT } from '@fortawesome/free-solid-svg-icons/faT';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { faTableCells } from '@fortawesome/free-solid-svg-icons/faTableCells';
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons/faTableCellsLarge';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons/faTableColumns';
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag';
import { faTimeline } from '@fortawesome/free-solid-svg-icons/faTimeline';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons/faWindowMaximize';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons/faWindowMinimize';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import {
  WebModules,
  WebSubModulesChart,
  WebSubModulesDataDisplay,
  WebSubModulesDateTime,
  WebSubModulesFeedback,
  WebSubModulesInputs,
  WebSubModulesLayout,
  WebSubModulesNavigation,
  WebSubModulesSurfaces,
} from '../constants/modules.constants';

export type WebModuleWithSubRoutes = {
  [WebModuleT in keyof RoutesMetadataMui]: RoutesMetadataMui[WebModuleT] extends {
    subRoutes: object;
  }
    ? WebModuleT
    : never;
}[keyof RoutesMetadataMui];

export type SubModuleOf<WebModuleT extends WebModuleWithSubRoutes> =
  keyof RoutesMetadataMui[WebModuleT]['subRoutes'] & string;

type RoutesMetadataMui = typeof routesMetadataMui;

export const routesMetadataMui = {
  [WebModules.palette]: {
    path: `/${WebModules.palette}`,
    icon: faPalette,
    label: upperFirst(lowerCase(WebModules.palette)),
  },
  [WebModules.inputs]: {
    path: `/${WebModules.inputs}`,
    icon: faKeyboard,
    label: upperFirst(lowerCase(WebModules.inputs)),
    subRoutes: {
      [WebSubModulesInputs.autocomplete]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.autocomplete}`,
        icon: faMagnifyingGlass,
        label: upperFirst(lowerCase(WebSubModulesInputs.autocomplete)),
      },
      [WebSubModulesInputs.button]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.button}`,
        icon: faHandPointer,
        label: upperFirst(lowerCase(WebSubModulesInputs.button)),
      },
      [WebSubModulesInputs.buttonGroup]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.buttonGroup}`,
        icon: faBorderAll,
        label: upperFirst(lowerCase(WebSubModulesInputs.buttonGroup)),
      },
      [WebSubModulesInputs.checkbox]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.checkbox}`,
        icon: faSquareCheck,
        label: upperFirst(lowerCase(WebSubModulesInputs.checkbox)),
      },
      [WebSubModulesInputs.floatingActionButton]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.floatingActionButton}`,
        icon: faCirclePlus,
        label: upperFirst(lowerCase(WebSubModulesInputs.floatingActionButton)),
      },
      [WebSubModulesInputs.numberField]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.numberField}`,
        icon: fa1,
        label: upperFirst(lowerCase(WebSubModulesInputs.numberField)),
      },
      [WebSubModulesInputs.radioGroup]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.radioGroup}`,
        icon: faCircleDot,
        label: upperFirst(lowerCase(WebSubModulesInputs.radioGroup)),
      },
      [WebSubModulesInputs.rating]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.rating}`,
        icon: faStar,
        label: upperFirst(lowerCase(WebSubModulesInputs.rating)),
      },
      [WebSubModulesInputs.select]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.select}`,
        icon: faCaretDown,
        label: upperFirst(lowerCase(WebSubModulesInputs.select)),
      },
      [WebSubModulesInputs.slider]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.slider}`,
        icon: faSliders,
        label: upperFirst(lowerCase(WebSubModulesInputs.slider)),
      },
      [WebSubModulesInputs.switch]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.switch}`,
        icon: faToggleOn,
        label: upperFirst(lowerCase(WebSubModulesInputs.switch)),
      },
      [WebSubModulesInputs.textField]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.textField}`,
        icon: faT,
        label: upperFirst(lowerCase(WebSubModulesInputs.textField)),
      },
      [WebSubModulesInputs.transferList]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.transferList}`,
        icon: faArrowRightArrowLeft,
        label: upperFirst(lowerCase(WebSubModulesInputs.transferList)),
      },
      [WebSubModulesInputs.toggleButton]: {
        path: `/${WebModules.inputs}/${WebSubModulesInputs.toggleButton}`,
        icon: faCircleHalfStroke,
        label: upperFirst(lowerCase(WebSubModulesInputs.toggleButton)),
      },
    },
  },
  [WebModules.dataDisplay]: {
    path: `/${WebModules.dataDisplay}`,
    icon: faTable,
    label: upperFirst(lowerCase(WebModules.dataDisplay)),
    subRoutes: {
      [WebSubModulesDataDisplay.avatar]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.avatar}`,
        icon: faCircleUser,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.avatar)),
      },
      [WebSubModulesDataDisplay.badge]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.badge}`,
        icon: faCertificate,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.badge)),
      },
      [WebSubModulesDataDisplay.chip]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.chip}`,
        icon: faTag,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.chip)),
      },
      [WebSubModulesDataDisplay.divider]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.divider}`,
        icon: faMinus,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.divider)),
      },
      [WebSubModulesDataDisplay.icon]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.icon}`,
        icon: faIcons,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.icon)),
      },
      [WebSubModulesDataDisplay.list]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.list}`,
        icon: faList,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.list)),
      },
      [WebSubModulesDataDisplay.table]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.table}`,
        icon: faTable,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.table)),
      },
      [WebSubModulesDataDisplay.tooltip]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.tooltip}`,
        icon: faCircleInfo,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.tooltip)),
      },
      [WebSubModulesDataDisplay.typography]: {
        path: `/${WebModules.dataDisplay}/${WebSubModulesDataDisplay.typography}`,
        icon: faFont,
        label: upperFirst(lowerCase(WebSubModulesDataDisplay.typography)),
      },
    },
  },
  [WebModules.feedback]: {
    path: `/${WebModules.feedback}`,
    icon: faBell,
    label: upperFirst(lowerCase(WebModules.feedback)),
    subRoutes: {
      [WebSubModulesFeedback.alert]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.alert}`,
        icon: faTriangleExclamation,
        label: upperFirst(lowerCase(WebSubModulesFeedback.alert)),
      },
      [WebSubModulesFeedback.backdrop]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.backdrop}`,
        icon: faWindowRestore,
        label: upperFirst(lowerCase(WebSubModulesFeedback.backdrop)),
      },
      [WebSubModulesFeedback.dialog]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.dialog}`,
        icon: faWindowMaximize,
        label: upperFirst(lowerCase(WebSubModulesFeedback.dialog)),
      },
      [WebSubModulesFeedback.progress]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.progress}`,
        icon: faSpinner,
        label: upperFirst(lowerCase(WebSubModulesFeedback.progress)),
      },
      [WebSubModulesFeedback.skeleton]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.skeleton}`,
        icon: faSkullCrossbones,
        label: upperFirst(lowerCase(WebSubModulesFeedback.skeleton)),
      },
      [WebSubModulesFeedback.snackbar]: {
        path: `/${WebModules.feedback}/${WebSubModulesFeedback.snackbar}`,
        icon: faMessage,
        label: upperFirst(lowerCase(WebSubModulesFeedback.snackbar)),
      },
    },
  },
  [WebModules.surfaces]: {
    path: `/${WebModules.surfaces}`,
    icon: faLayerGroup,
    label: upperFirst(lowerCase(WebModules.surfaces)),
    subRoutes: {
      [WebSubModulesSurfaces.accordion]: {
        path: `/${WebModules.surfaces}/${WebSubModulesSurfaces.accordion}`,
        icon: faArrowDownShortWide,
        label: upperFirst(lowerCase(WebSubModulesSurfaces.accordion)),
      },
      [WebSubModulesSurfaces.appBar]: {
        path: `/${WebModules.surfaces}/${WebSubModulesSurfaces.appBar}`,
        icon: faBars,
        label: upperFirst(lowerCase(WebSubModulesSurfaces.appBar)),
      },
      [WebSubModulesSurfaces.card]: {
        path: `/${WebModules.surfaces}/${WebSubModulesSurfaces.card}`,
        icon: faIdCard,
        label: upperFirst(lowerCase(WebSubModulesSurfaces.card)),
      },
      [WebSubModulesSurfaces.paper]: {
        path: `/${WebModules.surfaces}/${WebSubModulesSurfaces.paper}`,
        icon: faFile,
        label: upperFirst(lowerCase(WebSubModulesSurfaces.paper)),
      },
    },
  },
  [WebModules.navigation]: {
    path: `/${WebModules.navigation}`,
    icon: faCompass,
    label: upperFirst(lowerCase(WebModules.navigation)),
    subRoutes: {
      [WebSubModulesNavigation.bottomNavigation]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.bottomNavigation}`,
        icon: faWindowMinimize,
        label: upperFirst(lowerCase(WebSubModulesNavigation.bottomNavigation)),
      },
      [WebSubModulesNavigation.breadcrumbs]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.breadcrumbs}`,
        icon: faAngleRight,
        label: upperFirst(lowerCase(WebSubModulesNavigation.breadcrumbs)),
      },
      [WebSubModulesNavigation.drawer]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.drawer}`,
        icon: faTableColumns,
        label: upperFirst(lowerCase(WebSubModulesNavigation.drawer)),
      },
      [WebSubModulesNavigation.link]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.link}`,
        icon: faLink,
        label: upperFirst(lowerCase(WebSubModulesNavigation.link)),
      },
      [WebSubModulesNavigation.menu]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.menu}`,
        icon: faEllipsisVertical,
        label: upperFirst(lowerCase(WebSubModulesNavigation.menu)),
      },
      [WebSubModulesNavigation.menubar]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.menubar}`,
        icon: faGripLines,
        label: upperFirst(lowerCase(WebSubModulesNavigation.menubar)),
      },
      [WebSubModulesNavigation.pagination]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.pagination}`,
        icon: faArrowsLeftRight,
        label: upperFirst(lowerCase(WebSubModulesNavigation.pagination)),
      },
      [WebSubModulesNavigation.speedDial]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.speedDial}`,
        icon: faBolt,
        label: upperFirst(lowerCase(WebSubModulesNavigation.speedDial)),
      },
      [WebSubModulesNavigation.stepper]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.stepper}`,
        icon: faTimeline,
        label: upperFirst(lowerCase(WebSubModulesNavigation.stepper)),
      },
      [WebSubModulesNavigation.tabs]: {
        path: `/${WebModules.navigation}/${WebSubModulesNavigation.tabs}`,
        icon: faFolder,
        label: upperFirst(lowerCase(WebSubModulesNavigation.tabs)),
      },
    },
  },
  [WebModules.layout]: {
    path: `/${WebModules.layout}`,
    icon: faTableCells,
    label: upperFirst(lowerCase(WebModules.layout)),
    subRoutes: {
      [WebSubModulesLayout.container]: {
        path: `/${WebModules.layout}/${WebSubModulesLayout.container}`,
        icon: faExpand,
        label: upperFirst(lowerCase(WebSubModulesLayout.container)),
      },
      [WebSubModulesLayout.grid]: {
        path: `/${WebModules.layout}/${WebSubModulesLayout.grid}`,
        icon: faGrip,
        label: upperFirst(lowerCase(WebSubModulesLayout.grid)),
      },
      [WebSubModulesLayout.imageList]: {
        path: `/${WebModules.layout}/${WebSubModulesLayout.imageList}`,
        icon: faImages,
        label: upperFirst(lowerCase(WebSubModulesLayout.imageList)),
      },
      [WebSubModulesLayout.stack]: {
        path: `/${WebModules.layout}/${WebSubModulesLayout.stack}`,
        icon: faCubes,
        label: upperFirst(lowerCase(WebSubModulesLayout.stack)),
      },
    },
  },
  [WebModules.dateTime]: {
    path: `/${WebModules.dateTime}`,
    icon: faClock,
    label: upperFirst(lowerCase(WebModules.dateTime)),
    subRoutes: {
      [WebSubModulesDateTime.datePicker]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.datePicker}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.datePicker)),
      },
      [WebSubModulesDateTime.datePickerRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.datePickerRange}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.datePickerRange)),
      },
      [WebSubModulesDateTime.dateField]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateField}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateField)),
      },
      [WebSubModulesDateTime.dateFieldRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateFieldRange}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateFieldRange)),
      },
      [WebSubModulesDateTime.dateCalendar]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateCalendar}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateCalendar)),
      },
      [WebSubModulesDateTime.dateCalendarRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateCalendarRange}`,
        icon: faCalendarDay,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateCalendarRange)),
      },
      [WebSubModulesDateTime.timePicker]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timePicker}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timePicker)),
      },
      [WebSubModulesDateTime.timePickerRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timePickerRange}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timePickerRange)),
      },
      [WebSubModulesDateTime.timeField]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timeField}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timeField)),
      },
      [WebSubModulesDateTime.timeFieldRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timeFieldRange}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timeFieldRange)),
      },
      [WebSubModulesDateTime.timeClockAnalog]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timeClockAnalog}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timeClockAnalog)),
      },
      [WebSubModulesDateTime.timeClockDigital]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.timeClockDigital}`,
        icon: faClock,
        label: upperFirst(lowerCase(WebSubModulesDateTime.timeClockDigital)),
      },
      [WebSubModulesDateTime.dateTimePicker]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateTimePicker}`,
        icon: faCalendarDays,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateTimePicker)),
      },
      [WebSubModulesDateTime.dateTimePickerRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateTimePickerRange}`,
        icon: faCalendarDays,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateTimePickerRange)),
      },
      [WebSubModulesDateTime.dateTimeField]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateTimeField}`,
        icon: faCalendarDays,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateTimeField)),
      },
      [WebSubModulesDateTime.dateTimeFieldRange]: {
        path: `/${WebModules.dateTime}/${WebSubModulesDateTime.dateTimeFieldRange}`,
        icon: faCalendarDays,
        label: upperFirst(lowerCase(WebSubModulesDateTime.dateTimeFieldRange)),
      },
    },
  },
  [WebModules.dataGrid]: {
    path: `/${WebModules.dataGrid}`,
    icon: faTableCellsLarge,
    label: upperFirst(lowerCase(WebModules.dataGrid)),
  },
  [WebModules.chart]: {
    path: `/${WebModules.chart}`,
    icon: faChartSimple,
    label: upperFirst(lowerCase(WebModules.chart)),
    subRoutes: {
      [WebSubModulesChart.bar]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.bar}`,
        icon: faChartColumn,
        label: upperFirst(lowerCase(WebSubModulesChart.bar)),
      },
      [WebSubModulesChart.line]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.line}`,
        icon: faChartLine,
        label: upperFirst(lowerCase(WebSubModulesChart.line)),
      },
      [WebSubModulesChart.area]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.area}`,
        icon: faChartArea,
        label: upperFirst(lowerCase(WebSubModulesChart.area)),
      },
      [WebSubModulesChart.pie]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.pie}`,
        icon: faChartPie,
        label: upperFirst(lowerCase(WebSubModulesChart.pie)),
      },
      [WebSubModulesChart.scatter]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.scatter}`,
        icon: faBraille,
        label: upperFirst(lowerCase(WebSubModulesChart.scatter)),
      },
      [WebSubModulesChart.sparkline]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.sparkline}`,
        icon: faWaveSquare,
        label: upperFirst(lowerCase(WebSubModulesChart.sparkline)),
      },
      [WebSubModulesChart.gauge]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.gauge}`,
        icon: faGauge,
        label: upperFirst(lowerCase(WebSubModulesChart.gauge)),
      },
      [WebSubModulesChart.radar]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.radar}`,
        icon: faBullseye,
        label: upperFirst(lowerCase(WebSubModulesChart.radar)),
      },
      [WebSubModulesChart.heatmap]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.heatmap}`,
        icon: faFire,
        label: upperFirst(lowerCase(WebSubModulesChart.heatmap)),
      },
      [WebSubModulesChart.funnel]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.funnel}`,
        icon: faFilter,
        label: upperFirst(lowerCase(WebSubModulesChart.funnel)),
      },
      [WebSubModulesChart.sankey]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.sankey}`,
        icon: faDiagramProject,
        label: upperFirst(lowerCase(WebSubModulesChart.sankey)),
      },
      [WebSubModulesChart.candlestick]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.candlestick}`,
        icon: faMoneyBillTrendUp,
        label: upperFirst(lowerCase(WebSubModulesChart.candlestick)),
      },
      [WebSubModulesChart.radialBar]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.radialBar}`,
        icon: faCircleNotch,
        label: upperFirst(lowerCase(WebSubModulesChart.radialBar)),
      },
      [WebSubModulesChart.radialLine]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.radialLine}`,
        icon: faCircleNodes,
        label: upperFirst(lowerCase(WebSubModulesChart.radialLine)),
      },
      [WebSubModulesChart.map]: {
        path: `/${WebModules.chart}/${WebSubModulesChart.map}`,
        icon: faMap,
        label: upperFirst(lowerCase(WebSubModulesChart.map)),
      },
    },
  },
  [WebModules.chat]: {
    path: `/${WebModules.chat}`,
    icon: faComments,
    label: upperFirst(lowerCase(WebModules.chat)),
  },
  [WebModules.treeView]: {
    path: `/${WebModules.treeView}`,
    icon: faFolderTree,
    label: upperFirst(lowerCase(WebModules.treeView)),
  },
  [WebModules.scheduler]: {
    path: `/${WebModules.scheduler}`,
    icon: faCalendarDays,
    label: upperFirst(lowerCase(WebModules.scheduler)),
  },
} satisfies RoutesMetadata<IconDefinition>;
