import { Address } from '@js-modules/common-utils-general';
import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import isEmpty from 'validator/lib/isEmpty';
import { FormErrors } from '../../hooks/webReactHooksMaterialUi/useFormUtils';

export function validateAddress(
  address: Address,
  formErrors: FormErrors<Address>,
  fieldNames: (keyof Address)[] = [],
): FormErrors<Address> {
  const formErrorsTemp: FormErrors<Address> = { ...formErrors };

  if (_isEmpty(fieldNames) || fieldNames.includes('countryCode')) {
    const fieldErrors: string[] = [];

    if (isEmpty(address.countryCode)) {
      fieldErrors.push('Select country');
    }

    formErrorsTemp.countryCode = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('city')) {
    const fieldErrors: string[] = [];

    if (isEmpty(address.city)) {
      fieldErrors.push('Enter city');
    }

    formErrorsTemp.city = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('postalCode')) {
    const fieldErrors: string[] = [];

    if (isEmpty(address.postalCode)) {
      fieldErrors.push('Enter postal code');
    }

    formErrorsTemp.postalCode = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('addressLine1')) {
    const fieldErrors: string[] = [];

    if (isEmpty(address.addressLine1)) {
      fieldErrors.push('Enter address line 1');
    }

    formErrorsTemp.addressLine1 = fieldErrors;
  }

  const formErrorsClean: FormErrors<Address> = pickBy(
    formErrorsTemp,
    (fieldErrors) => fieldErrors.length > 0,
  );
  return formErrorsClean;
}
