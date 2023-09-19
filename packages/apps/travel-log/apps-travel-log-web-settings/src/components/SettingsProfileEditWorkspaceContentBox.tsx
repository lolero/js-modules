import React, { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  StateSettingsReducer,
  useStateSettingsUpdatePartialReducerMetadata,
  useStateSettingsValidateProfilePartialUnsaved,
} from '@js-modules/apps-travel-log-common-store-redux';
import { useFormUtils } from '@js-modules/web-react-hooks';

export const SettingsProfileEditWorkspaceContentBox: React.FC = () => {
  const {
    reducerMetadata: { profile, profilePartialUnsaved },
    callback: settingsUpdatePartialReducerMetadataCallback,
  } = useStateSettingsUpdatePartialReducerMetadata();

  const {
    formErrors: formErrorsProfilePartialUnsaved,
    validateCallback: validateCallbackProfilePartialUnsaved,
  } = useStateSettingsValidateProfilePartialUnsaved();

  const updateProfilePartialUnsavedCallback = useCallback(
    (
      profilePartialUnsavedUpdated: StateSettingsReducer['metadata']['profilePartialUnsaved'],
    ) => {
      settingsUpdatePartialReducerMetadataCallback({
        profilePartialUnsaved: profilePartialUnsavedUpdated,
      });
    },
    [settingsUpdatePartialReducerMetadataCallback],
  );

  const profilePartialUnsavedNonNull = useMemo(() => {
    return profilePartialUnsaved ?? {};
  }, [profilePartialUnsaved]);
  const {
    formDataTemp: profilePartialUnsavedTemp,
    changeFieldCallback: changeFieldCallbackProfilePartialUnsaved,
    blurFieldCallback: blurFieldCallbackProfilePartialUnsaved,
  } = useFormUtils(
    profilePartialUnsavedNonNull,
    formErrorsProfilePartialUnsaved,
    validateCallbackProfilePartialUnsaved,
    updateProfilePartialUnsavedCallback,
  );

  return (
    <Box>
      <TextField
        required
        label="Email"
        name="Email"
        value={profilePartialUnsavedTemp.email ?? profile?.email ?? ''}
        onChange={changeFieldCallbackProfilePartialUnsaved}
        onBlur={blurFieldCallbackProfilePartialUnsaved}
        error={!!formErrorsProfilePartialUnsaved.email?.length}
        helperText={formErrorsProfilePartialUnsaved.email?.join(', ')}
        inputProps={{
          'data-key': 'email',
        }}
      />
    </Box>
  );
};
