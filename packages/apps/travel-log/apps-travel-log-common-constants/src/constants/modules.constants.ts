import type { Enum } from '@js-modules/common-utils-general';
export const ApiControllersTravelLog = {
  usersPublic: 'users',
  usersPrivate: 'users-private',
  logEntries: 'log-entries',
} as const;
export type ApiControllersTravelLog = Enum<typeof ApiControllersTravelLog>;

export const ApiSubHandlersUsersPrivate = {
  resetPassword: 'reset-password',
} as const;
export type ApiSubHandlersUsersPrivate = Enum<
  typeof ApiSubHandlersUsersPrivate
>;

export const ApiSubHandlersTransactions = {
  testPath: 'test-path',
} as const;
export type ApiSubHandlersTransactions = Enum<
  typeof ApiSubHandlersTransactions
>;

export const WebModulesPublic = {
  home: 'home',
  purpose: 'purpose',
} as const;
export type WebModulesPublic = Enum<typeof WebModulesPublic>;

export const WebModulesPrivate = {
  feeds: 'feeds',
  boards: 'boards',
  log: 'log',
  network: 'network',
  settings: 'settings',
} as const;
export type WebModulesPrivate = Enum<typeof WebModulesPrivate>;

export const WebSubModulesFeeds = {
  general: 'general',
} as const;
export type WebSubModulesFeeds = Enum<typeof WebSubModulesFeeds>;

export const WebSubModulesBoards = {
  public: 'public',
  followers: 'followers',
  friends: 'friends',
} as const;
export type WebSubModulesBoards = Enum<typeof WebSubModulesBoards>;

export const WebSubModulesLog = {
  logEntry: 'log-entry',
  trips: 'trips',
  dives: 'dives',
} as const;
export type WebSubModulesLog = Enum<typeof WebSubModulesLog>;

export const WebSubModulesLogLogEntry = {
  addNew: 'add-new',
  edit: 'edit',
} as const;
export type WebSubModulesLogLogEntry = Enum<typeof WebSubModulesLogLogEntry>;

export const WebSubModulesNetwork = {
  connections: 'connections',
  friends: 'friends',
  inPerson: 'in-person',
  following: 'following',
  followers: 'followers',
  groups: 'groups',
} as const;
export type WebSubModulesNetwork = Enum<typeof WebSubModulesNetwork>;

export const WebSubModulesSettings = {
  profile: 'profile',
  account: 'account',
  billing: 'billing',
  privacy: 'privacy',
} as const;
export type WebSubModulesSettings = Enum<typeof WebSubModulesSettings>;

export const WebSubModulesSettingsProfile = {
  edit: 'edit-profile',
} as const;
export type WebSubModulesSettingsProfile = Enum<
  typeof WebSubModulesSettingsProfile
>;
