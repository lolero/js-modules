export enum Modules {
  home = 'home',
}

export enum SubModulesHome {
  subModule1 = 'subModule1',
  subModule2 = 'subModule2',
}

export const modulePaths: Record<Modules | SubModulesHome, string> = {
  [Modules.home]: `/${Modules.home}`,
  [SubModulesHome.subModule1]: `/${Modules.home}/${SubModulesHome.subModule1}`,
  [SubModulesHome.subModule2]: `/${Modules.home}/${SubModulesHome.subModule2}`,
};
