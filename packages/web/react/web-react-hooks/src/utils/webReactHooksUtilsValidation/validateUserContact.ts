import { UserContact } from '@js-modules/common-utils-general';
import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { FormErrors } from '../../hooks/webReactHooksMaterialUi/useFormUtils';

export function validateUserContact(
  userContact: UserContact,
  formErrors: FormErrors<UserContact>,
  fieldNames: (keyof UserContact)[] = [],
): FormErrors<UserContact> {
  const formErrorsTemp: FormErrors<UserContact> = { ...formErrors };

  if (_isEmpty(fieldNames) || fieldNames.includes('email')) {
    const fieldErrors: string[] = [];

    if (isEmpty(userContact.email)) {
      fieldErrors.push('Enter email address');
    } else if (!isEmail(userContact.email)) {
      fieldErrors.push('Enter valid email address');
    }

    formErrorsTemp.email = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('firstName')) {
    const fieldErrors: string[] = [];

    if (isEmpty(userContact.firstName)) {
      fieldErrors.push('Enter name');
    }

    formErrorsTemp.firstName = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('lastName')) {
    const fieldErrors: string[] = [];

    if (isEmpty(userContact.lastName)) {
      fieldErrors.push('Enter surname');
    }

    formErrorsTemp.lastName = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('callingCode')) {
    const fieldErrors: string[] = [];

    if (isEmpty(userContact.callingCode)) {
      fieldErrors.push('Select calling code');
    }

    formErrorsTemp.callingCode = fieldErrors;
  }

  if (_isEmpty(fieldNames) || fieldNames.includes('phoneNumber')) {
    const fieldErrors: string[] = [];

    if (isEmpty(userContact.phoneNumber)) {
      fieldErrors.push('Enter mobile number');
    } else if (
      !isMobilePhone(`${userContact.callingCode}${userContact.phoneNumber}`)
    ) {
      fieldErrors.push('Enter valid mobile number');
    }

    formErrorsTemp.phoneNumber = fieldErrors;
  }

  const formErrorsClean: FormErrors<UserContact> = pickBy(
    formErrorsTemp,
    (fieldErrors) => fieldErrors.length > 0,
  );
  return formErrorsClean;
}
