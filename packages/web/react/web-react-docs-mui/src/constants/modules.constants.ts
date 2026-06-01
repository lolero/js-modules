export const WebModules = {
  palette: 'palette',
  inputs: 'inputs',
  dataDisplay: 'data-display',
  feedback: 'feedback',
  surfaces: 'surfaces',
  navigation: 'navigation',
  layout: 'layout',
  dateTime: 'date-time',
  dataGrid: 'data-grid',
  chart: 'chart',
  chat: 'chat',
  treeView: 'tree-view',
  scheduler: 'scheduler',
} as const;
export type WebModules = (typeof WebModules)[keyof typeof WebModules];

export const WebSubModulesInputs = {
  autocomplete: 'autocomplete',
  button: 'button',
  buttonGroup: 'button-group',
  checkbox: 'checkbox',
  floatingActionButton: 'floating-action-button',
  numberField: 'number-field',
  radioGroup: 'radio-group',
  rating: 'rating',
  select: 'select',
  slider: 'slider',
  switch: 'switch',
  textField: 'text-field',
  transferList: 'transfer-list',
  toggleButton: 'toggle-button',
} as const;
export type WebSubModulesInputs =
  (typeof WebSubModulesInputs)[keyof typeof WebSubModulesInputs];

export const WebSubModulesDataDisplay = {
  avatar: 'avatar',
  badge: 'badge',
  chip: 'chip',
  divider: 'divider',
  icon: 'icon',
  list: 'list',
  table: 'table',
  tooltip: 'tooltip',
  typography: 'typography',
} as const;
export type WebSubModulesDataDisplay =
  (typeof WebSubModulesDataDisplay)[keyof typeof WebSubModulesDataDisplay];

export const WebSubModulesFeedback = {
  alert: 'alert',
  backdrop: 'backdrop',
  dialog: 'dialog',
  progress: 'progress',
  skeleton: 'skeleton',
  snackbar: 'snackbar',
} as const;
export type WebSubModulesFeedback =
  (typeof WebSubModulesFeedback)[keyof typeof WebSubModulesFeedback];

export const WebSubModulesSurfaces = {
  accordion: 'accordion',
  appBar: 'app-bar',
  card: 'card',
  paper: 'paper',
} as const;
export type WebSubModulesSurfaces =
  (typeof WebSubModulesSurfaces)[keyof typeof WebSubModulesSurfaces];

export const WebSubModulesNavigation = {
  bottomNavigation: 'bottom-navigation',
  breadcrumbs: 'breadcrumbs',
  drawer: 'drawer',
  link: 'link',
  menu: 'menu',
  menubar: 'menubar',
  pagination: 'pagination',
  speedDial: 'speed-dial',
  stepper: 'stepper',
  tabs: 'tabs',
} as const;
export type WebSubModulesNavigation =
  (typeof WebSubModulesNavigation)[keyof typeof WebSubModulesNavigation];

export const WebSubModulesLayout = {
  container: 'container',
  grid: 'grid',
  stack: 'stack',
  imageList: 'image-list',
} as const;
export type WebSubModulesLayout =
  (typeof WebSubModulesLayout)[keyof typeof WebSubModulesLayout];

export const WebSubModulesDateTime = {
  datePicker: 'date-picker',
  datePickerRange: 'date-picker-range',
  dateField: 'date-field',
  dateFieldRange: 'date-field-range',
  dateCalendar: 'date-calendar',
  dateCalendarRange: 'date-calendar-range',
  timePicker: 'time-picker',
  timePickerRange: 'time-picker-range',
  timeField: 'time-field',
  timeFieldRange: 'time-field-range',
  timeClockAnalog: 'time-clock-analog',
  timeClockDigital: 'time-clock-digital',
  dateTimePicker: 'date-time-picker',
  dateTimePickerRange: 'date-time-picker-range',
  dateTimeField: 'date-time-field',
  dateTimeFieldRange: 'date-time-field-range',
} as const;
export type WebSubModulesDateTime =
  (typeof WebSubModulesDateTime)[keyof typeof WebSubModulesDateTime];

export const WebSubModulesChart = {
  bar: 'bar',
  line: 'line',
  area: 'area',
  pie: 'pie',
  scatter: 'scatter',
  sparkline: 'sparkline',
  gauge: 'gauge',
  radar: 'radar',
  heatmap: 'heatmap',
  funnel: 'funnel',
  sankey: 'sankey',
  candlestick: 'candlestick',
  radialBar: 'radialBar',
  radialLine: 'radial-line',
  map: 'map',
} as const;
export type WebSubModulesChart =
  (typeof WebSubModulesChart)[keyof typeof WebSubModulesChart];
