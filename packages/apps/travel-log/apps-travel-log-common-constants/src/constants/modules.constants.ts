export enum ApiControllersTravelLog {
  usersPublic = 'users',
  usersPrivate = 'users-private',
  logEntries = 'log-entries',
}

export enum ApiSubHandlersUsersPrivate {
  resetPassword = 'reset-password',
}

export enum ApiSubHandlersTransactions {
  testPath = 'test-path',
}

export enum WebModulesPublic {
  home = 'home',
  purpose = 'purpose',
}

export enum WebModulesPrivate {
  feeds = 'feeds',
  boards = 'boards',
  log = 'log',
  network = 'network',
  settings = 'settings',
}

export enum WebSubModulesFeeds {
  general = 'general',
}

export enum WebSubModulesBoards {
  public = 'public',
  followers = 'followers',
  friends = 'friends',
}

export enum WebSubModulesLog {
  logEntry = 'log-entry',
  trips = 'trips',
  dives = 'dives',
}

export enum WebSubModulesLogLogEntry {
  addNew = 'add-new',
  edit = 'edit',
}

export enum WebSubModulesNetwork {
  connections = 'connections',
  friends = 'friends',
  inPerson = 'in-person',
  following = 'following',
  followers = 'followers',
  groups = 'groups',
}

export enum WebSubModulesSettings {
  profile = 'profile',
  account = 'account',
  billing = 'billing',
  privacy = 'privacy',
}

export enum WebSubModulesSettingsProfile {
  edit = 'edit-profile',
}
