export enum PublicModules {
  home = 'home',
  purpose = 'purpose',
}

export const publicModulesPaths: Record<PublicModules, string> = {
  [PublicModules.home]: `/${PublicModules.home}`,
  [PublicModules.purpose]: `/${PublicModules.purpose}`,
};

export enum MyModules {
  myFeeds = 'my-feeds',
  myBoards = 'my-boards',
  myLog = 'my-log',
  myNetwork = 'my-network',
}

export enum SubModulesMyFeeds {
  general = 'general',
}

export enum SubModulesMyBoards {
  public = 'public',
  followers = 'followers',
  friends = 'friends',
}

export enum SubModulesMyLog {
  trips = 'trips',
  dives = 'dives',
}

export enum SubModulesMyNetwork {
  connections = 'connections',
  friends = 'friends',
  inPerson = 'in-person',
  following = 'following',
  followers = 'followers',
  groups = 'groups',
}

export const myModulesPaths: Record<
  | MyModules
  | SubModulesMyFeeds
  | SubModulesMyBoards
  | SubModulesMyLog
  | SubModulesMyNetwork,
  string
> = {
  [MyModules.myFeeds]: `/${MyModules.myFeeds}`,
  [SubModulesMyFeeds.general]: `/${MyModules.myFeeds}/${SubModulesMyFeeds.general}`,
  [MyModules.myBoards]: `/${MyModules.myBoards}`,
  [SubModulesMyBoards.public]: `/${MyModules.myBoards}/${SubModulesMyBoards.public}`,
  [SubModulesMyBoards.followers]: `/${MyModules.myBoards}/${SubModulesMyBoards.followers}`,
  [SubModulesMyBoards.friends]: `/${MyModules.myBoards}/${SubModulesMyBoards.friends}`,
  [MyModules.myLog]: `/${MyModules.myLog}`,
  [SubModulesMyLog.trips]: `/${MyModules.myLog}/${SubModulesMyLog.trips}`,
  [SubModulesMyLog.dives]: `/${MyModules.myLog}/${SubModulesMyLog.dives}`,
  [MyModules.myNetwork]: `/${MyModules.myNetwork}`,
  [SubModulesMyNetwork.connections]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.connections}`,
  [SubModulesMyNetwork.friends]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.friends}`,
  [SubModulesMyNetwork.inPerson]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.inPerson}`,
  [SubModulesMyNetwork.following]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.following}`,
  [SubModulesMyNetwork.followers]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.followers}`,
  [SubModulesMyNetwork.groups]: `/${MyModules.myNetwork}/${SubModulesMyNetwork.groups}`,
};
