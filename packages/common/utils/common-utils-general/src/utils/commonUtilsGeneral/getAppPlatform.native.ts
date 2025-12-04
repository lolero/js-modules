import { Platform } from 'react-native';
import { AppPlatform } from '../../types/commonTypesGeneral';

export function getAppPlatform(): AppPlatform {
  if (Platform.OS === 'android') {
    return AppPlatform.android;
  }
  if (Platform.OS === 'ios') {
    return AppPlatform.ios;
  }
  throw Error('Unknown native platform');
}
