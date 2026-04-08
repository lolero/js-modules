import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import isEmpty from 'lodash/isEmpty';
import type React from 'react';
import type { FormValidator } from '@js-modules/common-react-utils';
import type { UserContact } from '@js-modules/common-utils-general';
import type { FormUtilsWeb } from '../hooks/hooksMaterialUi/useFormUtilsWeb';
import type { FormTextFieldProps } from '../types/form.types';
import { CallingCodesAutocomplete } from './CallingCodesAutocomplete';

export type UserContactBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof UserContact)[];
  contactTemp: UserContact;
  changeFieldCallback: FormUtilsWeb<UserContact>['changeFieldCallback'];
  blurFieldCallback: FormUtilsWeb<UserContact>['blurFieldCallback'];
  formErrors: FormValidator<UserContact>['formErrors'];
  isFormFieldsDisabled: boolean;
  textFieldProps?: {
    email?: FormTextFieldProps;
    firstName?: FormTextFieldProps;
    lastName?: FormTextFieldProps;
    callingCode?: FormTextFieldProps;
    phoneNumber?: FormTextFieldProps;
  };
};

export const UserContactBox: React.FunctionComponent<UserContactBoxProps> = ({
  sx,
  renderFields = [],
  contactTemp,
  changeFieldCallback,
  blurFieldCallback,
  formErrors,
  isFormFieldsDisabled,
  textFieldProps = {},
}) => {
  return (
    <Box sx={sx}>
      {(isEmpty(renderFields) || renderFields.includes('email')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Email address"
          value={contactTemp.email}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.email?.length}
          helperText={formErrors.email?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'email' },
          }}
          {...textFieldProps.email}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('firstName')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Name"
          value={contactTemp.firstName}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.firstName?.length}
          helperText={formErrors.firstName?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'firstName' },
          }}
          {...textFieldProps.firstName}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('lastName')) && (
        <TextField
          required
          disabled={isFormFieldsDisabled}
          label="Surname"
          value={contactTemp.lastName}
          onChange={changeFieldCallback}
          onBlur={blurFieldCallback}
          error={!!formErrors.lastName?.length}
          helperText={formErrors.lastName?.join(', ')}
          slotProps={{
            htmlInput: { 'data-key': 'lastName' },
          }}
          {...textFieldProps.lastName}
        />
      )}
      {(isEmpty(renderFields) || renderFields.includes('phoneNumber')) && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <CallingCodesAutocomplete
            required
            disabled={isFormFieldsDisabled}
            label="Code"
            value={contactTemp.callingCode}
            onChange={changeFieldCallback}
            onBlur={blurFieldCallback}
            error={!!formErrors.callingCode?.length}
            helperText={formErrors.callingCode?.join(', ')}
            dataKey="callingCode"
            {...textFieldProps.callingCode}
          />
          <TextField
            fullWidth
            required
            disabled={isFormFieldsDisabled}
            label="Mobile number"
            value={contactTemp.phoneNumber}
            onChange={changeFieldCallback}
            onBlur={blurFieldCallback}
            error={!!formErrors.phoneNumber?.length}
            helperText={formErrors.phoneNumber?.join(', ')}
            slotProps={{
              htmlInput: { 'data-key': 'phoneNumber' },
            }}
            {...textFieldProps.phoneNumber}
          />
        </Box>
      )}
    </Box>
  );
};
