import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { FormUtils, FormValidator } from '@js-modules/web-react-hooks';
import TextField from '@mui/material/TextField';
import { Address } from '@js-modules/common-utils-general';
import isEmpty from 'lodash/isEmpty';
import { CountriesAutocomplete } from './CountriesAutocomplete';
import { FormTextFieldProps } from '../types/formTextFieldProps.types';

export type AddressBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof Address)[];
  addressTemp: Address;
  changeFieldCallback: FormUtils<Address>['changeFieldCallback'];
  blurFieldCallback: FormUtils<Address>['blurFieldCallback'];
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
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'city',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'postalCode',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'addressLine1',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'addressLine2',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textFieldProps.addressLine2}
        />
      )}
    </Box>
  );
};
