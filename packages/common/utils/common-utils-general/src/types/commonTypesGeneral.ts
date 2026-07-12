export type ClassObject<ClassT> = Pick<ClassT, keyof ClassT>;
export type Enum<T> = T[keyof T];

export const AppPlatform = {
  node: 'node',
  web: 'web',
  android: 'android',
  ios: 'ios',
} as const;
export type AppPlatform = Enum<typeof AppPlatform>;

export const ProcessStatus = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
  expired: 'expired',
  cancelled: 'cancelled',
} as const;
export type ProcessStatus = Enum<typeof ProcessStatus>;

export type UserContact = {
  email: string;
  firstName: string;
  lastName: string;
  callingCode: string;
  phoneNumber: string;
};

export type Address = {
  residentName?: string;
  countryCode: string;
  city: string;
  postalCode: string;
  addressLine1: string;
  addressLine2?: string;
};

export type PaymentCard = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};
