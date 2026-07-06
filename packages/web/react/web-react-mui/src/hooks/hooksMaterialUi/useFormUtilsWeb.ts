import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  FormData,
  FormErrors,
  FormFieldValue,
  FormUtils,
  FormValidator,
} from '@js-modules/common-react-utils';

export type FormEventWeb = HTMLInputElement | HTMLTextAreaElement;

export type FormUtilsWeb<FormDataT extends FormData = FormData> = FormUtils<
  FormDataT,
  FormEventWeb
>;

/**
 * Manages controlled web form state: keeps an editable copy of `formData`,
 * exposes input change/blur handlers, debounces propagation of edits via
 * `updateCallback`, and re-validates fields that already have errors.
 * @param formData - The committed form data to sync the editable copy from.
 * @param formErrors - Current validation errors keyed by field name.
 * @param validateCallback - Validates the given field names.
 * @param updateCallback - Called (debounced) with the edited form data to persist it.
 * @param jsonFieldNames - Field names whose input value is a JSON string to parse.
 * @param debounceWaitMilliseconds - Debounce wait before `updateCallback` fires.
 * @returns Web form utils: temp form data, its setter, and change/blur handlers.
 */
export function useFormUtilsWeb<FormDataT extends FormData>(
  formData: FormDataT,
  formErrors: FormErrors<FormDataT>,
  validateCallback: FormValidator<FormDataT>['validateCallback'],
  updateCallback: (formData: FormDataT) => void,
  jsonFieldNames: (keyof FormDataT)[] = [],
  debounceWaitMilliseconds: number = 500,
): FormUtilsWeb<FormDataT> {
  const [formDataTemp, setFormDataTemp] = useState<FormDataT>(formData);
  const fieldsToValidateRef = useRef<(keyof FormDataT)[]>([]);
  const [validationVersion, setValidationVersion] = useState(0);

  const changeFieldCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputType = e.currentTarget.getAttribute('type');
      const fieldName = e.currentTarget.getAttribute(
        'data-key',
      ) as keyof FormDataT;
      let fieldValue: FormFieldValue = e.target.value;
      if (inputType === 'checkbox') {
        fieldValue = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
      } else if (inputType === 'file') {
        fieldValue = Array.from(
          (e as React.ChangeEvent<HTMLInputElement>).target.files!,
        );
      } else if (jsonFieldNames.includes(fieldName)) {
        fieldValue = JSON.parse(fieldValue) as FormFieldValue;
      }
      setFormDataTemp((tempFormDataPrev) => {
        return {
          ...tempFormDataPrev,
          [fieldName]: fieldValue,
        };
      });
      if (formErrors[fieldName]?.length) {
        fieldsToValidateRef.current = [fieldName];
        setValidationVersion((version) => version + 1);
      }
    },
    [formErrors, jsonFieldNames],
  );

  const blurFieldCallback = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldName = e.currentTarget.getAttribute(
        'data-key',
      ) as keyof FormDataT;
      fieldsToValidateRef.current = [fieldName];
      setValidationVersion((version) => version + 1);
    },
    [],
  );

  const updateFormDataCallbackDebounced = useMemo(
    () => debounce(updateCallback, debounceWaitMilliseconds),
    [updateCallback, debounceWaitMilliseconds],
  );

  useEffect(() => {
    if (isEqual(formData, formDataTemp)) {
      return;
    }
    updateFormDataCallbackDebounced(formDataTemp);
  }, [formData, formDataTemp, updateFormDataCallbackDebounced]);

  useEffect(() => {
    const fieldsToValidate = fieldsToValidateRef.current;
    if (!fieldsToValidate.length || !isEqual(formData, formDataTemp)) {
      return;
    }
    validateCallback(fieldsToValidate);
    fieldsToValidateRef.current = [];
  }, [formData, formDataTemp, validateCallback, validationVersion]);

  return {
    formDataTemp,
    setFormDataTemp,
    changeFieldCallback,
    blurFieldCallback,
  };
}
