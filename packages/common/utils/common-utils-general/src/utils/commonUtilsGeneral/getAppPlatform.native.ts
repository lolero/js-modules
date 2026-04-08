// Metro resolves *.native.ts over *.ts, web bundlers never reach this file
// react-native is an optional peer dep so eslint cant find it but metro can
// @ts-expect-error -- react-native is an optional peer dep that metro resolves
import { Platform } from 'react-native'; // eslint-disable-line import-x/no-unresolved
import { AppPlatform } from '../../types/commonTypesGeneral';

export function getAppPlatform(): AppPlatform {
  // tsc can't resolve the peer dep, but it's safe at Metro build time
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (Platform.OS === 'android') {
    return AppPlatform.android;
  }
  // tsc can't resolve the peer dep, but it's safe at Metro build time
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (Platform.OS === 'ios') {
    return AppPlatform.ios;
  }
  throw Error('Unknown native platform');
}
