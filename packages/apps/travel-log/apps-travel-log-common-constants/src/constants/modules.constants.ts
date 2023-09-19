export enum ApiControllersTravelLog {
  usersPublic = 'users',
  usersPrivate = 'users-private',
  transactions = 'transactions',
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
  myFeeds = 'my-feeds',
  myBoards = 'my-boards',
  myLog = 'my-log',
  myNetwork = 'my-network',
  settings = 'settings',
}

export enum WebSubModulesMyFeeds {
  general = 'general',
}

export enum WebSubModulesMyBoards {
  public = 'public',
  followers = 'followers',
  friends = 'friends',
}

export enum WebSubModulesMyLog {
  trips = 'trips',
  dives = 'dives',
}

export enum WebSubModulesMyNetwork {
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
