import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type React from 'react';
import { useCallback, useMemo } from 'react';
import type { StateSettingsReducer } from '@js-modules/apps-travel-log-common-store-redux';
import {
  useStateSettingsUpdatePartialReducerMetadata,
  useStateSettingsValidateProfilePartialUnsaved,
} from '@js-modules/apps-travel-log-common-store-redux';
import type { ClassObject } from '@js-modules/common-utils-general';
import { useFormUtilsWeb } from '@js-modules/web-react-mui';

export function SettingsProfileEditWorkspaceContentBox(): React.ReactNode {
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

  const profilePartialUnsavedNonNull = useMemo(
    () => profilePartialUnsaved ?? {},
    [profilePartialUnsaved],
  );
  const {
    formDataTemp: profilePartialUnsavedTemp,
    changeFieldCallback: changeFieldCallbackProfilePartialUnsaved,
    blurFieldCallback: blurFieldCallbackProfilePartialUnsaved,
  } = useFormUtilsWeb<ClassObject<typeof profilePartialUnsavedNonNull>>(
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
        slotProps={{ htmlInput: { 'data-key': 'email' } }}
      />
    </Box>
  );
}
