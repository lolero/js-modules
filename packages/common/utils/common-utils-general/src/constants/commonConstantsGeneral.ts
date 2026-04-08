export const MAX_DATE_MILLISECONDS = 8640000000000000;
export const IS_ENV_DEV = process.env.NODE_ENV === 'development';

type GlobalCrossPlatform = typeof globalThis & {
  window?: { document?: unknown };
  navigator?: { product?: string };
};
const globalCrossPlatform = globalThis as GlobalCrossPlatform;

export const IS_PLATFORM_WEB =
  globalCrossPlatform.window !== undefined &&
  globalCrossPlatform.window.document !== undefined;

export const IS_PLATFORM_NATIVE =
  globalCrossPlatform.navigator !== undefined &&
  globalCrossPlatform.navigator.product === 'ReactNative';
