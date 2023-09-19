import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import values from 'lodash/values';
import { validate } from 'class-validator';
import { FormErrors } from '../../hooks/webReactHooksMaterialUi/useFormUtils';

export async function validateDto<DtoT extends Record<string, any>>(
  dto: DtoT,
  formErrors: FormErrors<DtoT>,
  fieldNames: (keyof DtoT)[] = [],
): Promise<FormErrors<DtoT>> {
  const fieldNamesValidate = isEmpty(fieldNames)
    ? keys(dto)
    : (fieldNames as (keyof DtoT)[]);

  const formErrorsEmpty = fieldNamesValidate.reduce(
    (formErrorsEmptyTemp: FormErrors<DtoT>, fieldName) => {
      return {
        ...formErrorsEmptyTemp,
        [fieldName]: [],
      };
    },
    {},
  );

  const classValidatorErrors = await validate(dto);

  const formErrorsClassValidator = classValidatorErrors.reduce(
    (classValidatorFormErrorsTemp: FormErrors<DtoT>, validationError) => {
      if (!fieldNamesValidate.includes(validationError.property)) {
        return classValidatorFormErrorsTemp;
      }

      const errors = values(validationError.constraints);

      return {
        ...classValidatorFormErrorsTemp,
        [validationError.property]: [
          ...(classValidatorFormErrorsTemp[
            validationError.property as keyof DtoT
          ] ?? []),
          ...errors,
        ],
      };
    },
    {},
  );

  const formErrorsTemp: FormErrors<DtoT> = {
    ...formErrors,
    ...formErrorsEmpty,
    ...formErrorsClassValidator,
  };

  const formErrorsClean = pickBy(
    formErrorsTemp,
    (fieldErrors) => fieldErrors!.length > 0,
  ) as FormErrors<DtoT>;
  return formErrorsClean;
}
