import React, { useCallback, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

export type FormErrors<FormDataT> = Partial<Record<keyof FormDataT, string[]>>;

export type FormValidator<FormDataT extends Record<string, any>> = {
  formErrors: FormErrors<FormDataT>;
  validateCallback: (
    fieldNames?: (keyof FormDataT)[],
  ) => Promise<FormErrors<FormDataT>>;
};

export type FormUtils<FormDataT extends Record<string, any>> = {
  formDataTemp: FormDataT;
  changeFieldCallback: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  blurFieldCallback: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

/**
 * Utility hook to abstract the state and validation of input fields in a form
 *
 * @param {FormDataT} formData - Object representing the data inserted into
 *        the form through input fields
 * @param {FormErrors<FormDataT>} formErrors - Validation errors object
 * @param {FormValidator<FormDataT>['validateCallback']} validateCallback -
 *        Validation function that takes an array of FormDataT field names
 *        to validate
 * @param {(formData: FormDataT) => voi} updateCallback - Function to update
 *        the FormDataT when the user types into the input fields
 * @param {(keyof FormDataT)[]} jsonFieldNames - Field names for which the
 *        change event's target.value is a JSON string that should be
 *        committed to the form data as an object
 * @param {number} debounceWaitMilliseconds - Wait time for the debounce
 *        function that throttles FormDataT updates upon input field changes
 *
 * @returns {FormUtils<FormDataT>}
 */
export function useFormUtils<FormDataT extends Record<string, any>>(
  formData: FormDataT,
  formErrors: FormErrors<FormDataT>,
  validateCallback: FormValidator<FormDataT>['validateCallback'],
  updateCallback: (formData: FormDataT) => void,
  jsonFieldNames: (keyof FormDataT)[] = [],
  debounceWaitMilliseconds = 500,
): FormUtils<FormDataT> {
  const [formDataTemp, setFormDataTemp] = useState<FormDataT>(formData);
  const [fieldsToValidate, setFieldsToValidate] = useState<(keyof FormDataT)[]>(
    [],
  );

  const changeFieldCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputType = e.currentTarget.getAttribute('type');
      const fieldName = e.currentTarget.getAttribute(
        'data-key',
      ) as keyof FormDataT;
      let fieldValue: string | boolean = e.target.value;
      if (inputType === 'checkbox') {
        fieldValue = (e as React.ChangeEvent<HTMLInputElement>).target.checked;
      } else if (jsonFieldNames.includes(fieldName)) {
        fieldValue = JSON.parse(fieldValue);
      }
      setFormDataTemp((tempFormDataPrev) => {
        return {
          ...tempFormDataPrev,
          [fieldName]: fieldValue,
        };
      });
      if (formErrors[fieldName]?.length) {
        setFieldsToValidate([fieldName]);
      }
    },
    [formErrors, jsonFieldNames],
  );

  const blurFieldCallback = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldName = e.currentTarget.getAttribute(
        'data-key',
      ) as keyof FormDataT;
      setFieldsToValidate([fieldName]);
    },
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFormDataCallbackDebounced = useCallback(
    debounce(updateCallback, debounceWaitMilliseconds),
    [updateCallback],
  );

  useEffect(() => {
    if (isEqual(formData, formDataTemp)) {
      return;
    }
    updateFormDataCallbackDebounced(formDataTemp);
  }, [formData, formDataTemp, updateFormDataCallbackDebounced]);

  useEffect(() => {
    if (!fieldsToValidate.length || !isEqual(formData, formDataTemp)) {
      return;
    }
    validateCallback(fieldsToValidate);
    setFieldsToValidate([]);
  }, [formData, formDataTemp, fieldsToValidate, validateCallback]);

  return {
    formDataTemp,
    changeFieldCallback,
    blurFieldCallback,
  };
}
