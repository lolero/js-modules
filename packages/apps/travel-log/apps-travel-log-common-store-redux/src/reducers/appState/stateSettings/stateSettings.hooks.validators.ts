import { useCallback, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import {
  FormErrors,
  FormValidator,
  validateDto,
} from '@js-modules/web-react-hooks';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { StateSettingsReducer } from './stateSettings.types';
import { useStateSettingsReducerMetadata } from './stateSettings.hooks';

export type ProfilePartialUnsavedValidator = NonNullable<
  StateSettingsReducer['metadata']['profilePartialUnsaved']
>;
export function useStateSettingsValidateProfilePartialUnsaved(): FormValidator<ProfilePartialUnsavedValidator> {
  const { profilePartialUnsaved } = useStateSettingsReducerMetadata();

  const [formErrors, setFormErrors] = useState<
    FormErrors<ProfilePartialUnsavedValidator>
  >({});

  const validateCallback = useCallback(
    (fieldNames: (keyof ProfilePartialUnsavedValidator)[] = []) => {
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

      const formErrorsClean: FormErrors<ProfilePartialUnsavedValidator> =
        pickBy(formErrorsTemp, (fieldErrors) => fieldErrors.length > 0);

      setFormErrors(formErrorsClean);
      return formErrorsClean;
    },
    [profilePartialUnsaved, formErrors],
  );

  return {
    formErrors,
    validateCallback,
  };
}
