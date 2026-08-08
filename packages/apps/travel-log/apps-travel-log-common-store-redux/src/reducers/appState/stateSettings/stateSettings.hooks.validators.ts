import _isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
// import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.updateOnePartial.dto';
import type {
  FormErrors,
  FormValidator,
  // validateDto,
} from '@js-modules/common-react-utils';
import type { ClassObject } from '@js-modules/common-utils-general';
import { useStateSettingsReducerMetadata } from './stateSettings.hooks';
import type { StateSettingsReducer } from './stateSettings.types';

export type ProfilePartialUnsavedValidator = ClassObject<
  NonNullable<StateSettingsReducer['metadata']['profilePartialUnsaved']>
>;

export function useStateSettingsValidateProfilePartialUnsaved(): FormValidator<ProfilePartialUnsavedValidator> {
  const { profilePartialUnsaved } = useStateSettingsReducerMetadata();

  const [formErrors, setFormErrors] = useState<
    FormErrors<ProfilePartialUnsavedValidator>
  >({});

  function validateCallback(
    fieldNames: (keyof ProfilePartialUnsavedValidator)[] = [],
  ): FormErrors<ProfilePartialUnsavedValidator> {
    if (isNull(profilePartialUnsaved)) {
      return formErrors;
    }

    // const dto = Object.assign(
    //   new UsersUpdateOnePartialDto(),
    //   profilePartialUnsaved,
    // );
    // const formErrorsClean = await validateDto<ProfilePartialUnsavedValidator>(
    //   dto,
    //   formErrors,
    //   fieldNames,
    // );

    const formErrorsTemp: FormErrors<ProfilePartialUnsavedValidator> = {
      ...formErrors,
    };

    if (
      !isUndefined(profilePartialUnsaved.email) &&
      (_isEmpty(fieldNames) || fieldNames.includes('email'))
    ) {
      const fieldErrors: string[] = [];

      if (isEmpty(profilePartialUnsaved.email)) {
        fieldErrors.push('Enter email');
      } else if (!isEmail(profilePartialUnsaved.email)) {
        fieldErrors.push('Enter valid email');
      }

      formErrorsTemp.email = fieldErrors;
    }

    const formErrorsClean: FormErrors<ProfilePartialUnsavedValidator> = pickBy(
      formErrorsTemp,
      (fieldErrors) => fieldErrors.length > 0,
    );

    setFormErrors(formErrorsClean);
    return formErrorsClean;
  }

  return {
    formErrors,
    validateCallback,
  };
}
