export enum ProcessStatus {
  pending = 'pending',
  success = 'success',
  fail = 'fail',
  expired = 'expired',
  cancelled = 'cancelled',
}

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
