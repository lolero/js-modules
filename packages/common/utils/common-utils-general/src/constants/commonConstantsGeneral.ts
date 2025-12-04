export const MAX_DATE_MILLISECONDS = 8640000000000000;
export const IS_ENV_DEV = process.env.NODE_ENV === 'development';

export const IS_PLATFORM_WEB =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const IS_PLATFORM_NATIVE =
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
