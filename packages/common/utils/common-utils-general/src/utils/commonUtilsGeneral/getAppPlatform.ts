import { IS_PLATFORM_WEB } from '../../constants/commonConstantsGeneral';
import { AppPlatform } from '../../types/commonTypesGeneral';

export function getAppPlatform(): AppPlatform {
  if (IS_PLATFORM_WEB) {
    return AppPlatform.web;
  }
  return AppPlatform.node;
}
