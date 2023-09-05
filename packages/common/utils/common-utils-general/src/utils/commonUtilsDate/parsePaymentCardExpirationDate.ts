import floor from 'lodash/floor';

export type PaymentCardExpirationDateMetadata = {
  expirationMonth: string;
  expirationYear: string;
};

export function parsePaymentCardExpirationDate(
  paymentCardExpirationDate: string,
): PaymentCardExpirationDateMetadata {
  const [expirationMonth, expirationYearShort] =
    paymentCardExpirationDate.split('/');
  const currentYear = new Date().getFullYear();
  const currentCentury = floor(currentYear / 100);
  const currentCenturyYear = currentYear % 100;
  const expirationCentury =
    Number(expirationYearShort) >= currentCenturyYear
      ? currentCentury
      : currentCentury + 1;
  const expirationYearStr =
    expirationCentury * 100 + Number(expirationYearShort);
  const expirationYear = `${expirationYearStr}`;

  return {
    expirationMonth,
    expirationYear,
  };
}
