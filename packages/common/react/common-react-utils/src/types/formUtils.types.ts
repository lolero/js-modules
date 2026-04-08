import type React from 'react';

export type FormFieldValue = string | boolean | number | File[] | undefined;

export type FormData<FormFieldValueT extends FormFieldValue = FormFieldValue> =
  Record<string, FormFieldValueT>;

export type FormErrors<FormDataT extends FormData> = Partial<
  Record<keyof FormDataT, string[]>
>;

export type FormValidator<FormDataT extends FormData> = {
  formErrors: FormErrors<FormDataT>;
  validateCallback: (fieldNames?: (keyof FormDataT)[]) => FormErrors<FormDataT>;
};

export type FormUtils<FormDataT, FormEventT> = {
  formDataTemp: FormDataT;
  setFormDataTemp: React.Dispatch<React.SetStateAction<FormDataT>>;
  changeFieldCallback: (e: React.ChangeEvent<FormEventT>) => void;
  blurFieldCallback: (e: React.FocusEvent<FormEventT>) => void;
};
