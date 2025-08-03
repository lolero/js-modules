import { TextFieldProps } from '@mui/material/TextField';

export type FormTextFieldProps = Partial<
  Omit<
    TextFieldProps,
    | 'value'
    | 'onChange'
    | 'onBlur'
    | 'error'
    | 'helperText'
    | 'inputProps'
    | 'dataKey'
  >
>;
