import { AppPlatform } from '../../types/commonTypesGeneral';
import { getAppPlatform } from './getAppPlatform';

export const appPlatformIpDev: Record<AppPlatform, string> = {
  [AppPlatform.node]: 'localhost',
  [AppPlatform.web]: 'localhost',
  [AppPlatform.android]: '10.0.2.2',
  [AppPlatform.ios]: 'localhost',
};

export function getDevHostIp(): string {
  return appPlatformIpDev[getAppPlatform()];
}
