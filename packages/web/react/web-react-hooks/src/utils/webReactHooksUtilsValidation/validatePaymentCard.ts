import { PaymentCard } from '@js-modules/common-utils-general';
import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import isEmpty from 'validator/lib/isEmpty';
import isCreditCard from 'validator/lib/isCreditCard';
import isInt from 'validator/lib/isInt';
import { FormErrors } from '../../hooks/webReactHooksMaterialUi/useFormUtils';

export function validatePaymentCard(
  paymentCard: PaymentCard,
  formErrors: FormErrors<PaymentCard>,
  fieldNames: (keyof PaymentCard)[] = [],
): FormErrors<PaymentCard> {
  const formErrorsTemp: FormErrors<PaymentCard> = { ...formErrors };

  if (_isEmpty(fieldNames) || fieldNames.includes('cardHolderName')) {
    const fieldErrors: string[] = [];

    if (isEmpty(paymentCard.cardHolderName)) {
      fieldErrors.push('Enter cardholder name');
    }

    formErrorsTemp.cardHolderName = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('cardNumber')) {
    const fieldErrors: string[] = [];

    if (isEmpty(paymentCard.cardNumber)) {
      fieldErrors.push('Enter card number');
    } else if (!isCreditCard(paymentCard.cardNumber)) {
      fieldErrors.push('Enter valid card number');
    }

    formErrorsTemp.cardNumber = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('expirationDate')) {
    const fieldErrors: string[] = [];

    if (isEmpty(paymentCard.expirationDate)) {
      fieldErrors.push('Enter expiry date');
    } else if (
      !/(^(0[1-9]|1[0-2])\/\d{2}$)/gi.test(paymentCard.expirationDate)
    ) {
      fieldErrors.push('Enter valid expiry date (MM/YY)');
    }

    formErrorsTemp.expirationDate = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('cvv')) {
    const fieldErrors: string[] = [];

    if (isEmpty(paymentCard.cvv)) {
      fieldErrors.push('Enter CVV');
    } else if (!isInt(paymentCard.cvv, { min: 0, max: 9999 })) {
      fieldErrors.push('Enter valid CVV');
    }

    formErrorsTemp.cvv = fieldErrors;
  }

  const formErrorsClean: FormErrors<PaymentCard> = pickBy(
    formErrorsTemp,
    (fieldErrors) => fieldErrors.length > 0,
  );
  return formErrorsClean;
}
