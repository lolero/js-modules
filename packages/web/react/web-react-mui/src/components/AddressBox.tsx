import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import isEmpty from 'lodash/isEmpty';
import type React from 'react';
import type { FormValidator } from '@js-modules/common-react-utils';
import type { Address } from '@js-modules/common-utils-general';
import type { FormUtilsWeb } from '../hooks/hooksMaterialUi/useFormUtilsWeb';
import type { FormTextFieldProps } from '../types/form.types';
import { CountriesAutocomplete } from './CountriesAutocomplete';

export type AddressBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof Address)[];
  addressTemp: Address;
  changeFieldCallback: FormUtilsWeb<Address>['changeFieldCallback'];
  blurFieldCallback: FormUtilsWeb<Address>['blurFieldCallback'];
  formErrors: FormValidator<Address>['formErrors'];
  isFormFieldsDisabled: boolean;
  textFieldProps?: {
    countryCode?: FormTextFieldProps;
    city?: FormTextFieldProps;
    postalCode?: FormTextFieldProps;
    addressLine1?: FormTextFieldProps;
    addressLine2?: FormTextFieldProps;
  };
};

export const AddressBox: React.FunctionComponent<AddressBoxProps> = ({
  sx,
  renderFields = [],
  addressTemp,
  changeFieldCallback,
  blurFieldCallback,
  formErrors,
  isFormFieldsDisabled,
  textFieldProps = {},
}) => {
  return (
    <Box sx={sx}>
      {(isEmpty(renderFields) || renderFields.includes('countryCode')) && (
        <CountriesAutocomplete
          required
          disabled={isFormFieldsDisabled}
          label="Country"
          value={addressTemp.countryCode}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.countryCode?.length}
          helperText={formErrors.countryCode?.join(', ')}
          dataKey="countryCode"
          {...textFieldProps.countryCode}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('city')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="City"
          value={addressTemp.city}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.city?.length}
          helperText={formErrors.city?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'city' },
          }}
          {...textFieldProps.city}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('postalCode')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Postal code"
          value={addressTemp.postalCode}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.postalCode?.length}
          helperText={formErrors.postalCode?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'postalCode' },
          }}
          {...textFieldProps.postalCode}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('addressLine1')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Address line 1"
          value={addressTemp.addressLine1}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.addressLine1?.length}
          helperText={formErrors.addressLine1?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'addressLine1' },
          }}
          {...textFieldProps.addressLine1}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('addressLine2')) && (
        <TextField
          disabled={isFormFieldsDisabled}
          label="Address line 2 (Optional)"
          value={addressTemp.addressLine2}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.addressLine2?.length}
          helperText={formErrors.addressLine2?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'addressLine2' },
          }}
          {...textFieldProps.addressLine2}
        />
      )}
    </Box>
  );
};
