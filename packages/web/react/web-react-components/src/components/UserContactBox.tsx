import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormUtils, FormValidator } from '@js-modules/web-react-hooks';
import { UserContact } from '@js-modules/common-utils-general';
import isEmpty from 'lodash/isEmpty';
import { CallingCodesAutocomplete } from './CallingCodesAutocomplete';
import { FormTextFieldProps } from '../types/form.types';

export type UserContactBoxProps = {
  sx?: BoxProps['sx'];
  renderFields?: (keyof UserContact)[];
  contactTemp: UserContact;
  changeFieldCallback: FormUtils<UserContact>['changeFieldCallback'];
  blurFieldCallback: FormUtils<UserContact>['blurFieldCallback'];
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
          inputProps={{
            'data-key': 'email',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'firstName',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
          inputProps={{
            'data-key': 'lastName',
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
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
            // eslint-disable-next-line react/jsx-props-no-spreading
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
            inputProps={{
              'data-key': 'phoneNumber',
            }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...textFieldProps.phoneNumber}
          />
        </Box>
      )}
    </Box>
  );
};
