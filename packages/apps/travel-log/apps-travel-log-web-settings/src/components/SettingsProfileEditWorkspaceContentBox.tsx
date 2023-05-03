import React, { useCallback, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useStateSettingsUpdateProfilePartialUnsaved } from '@js-modules/apps-travel-log-common-store-redux';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import { pick } from 'lodash';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';

export const SettingsProfileEditWorkspaceContentBox: React.FC = () => {
  const {
    reducerMetadata: {
      profile,
      profilePartialUnsaved,
      profilePartialUnsavedErrors,
    },
    callback: updateProfilePartialUnsavedCallback,
  } = useStateSettingsUpdateProfilePartialUnsaved();

  const changeUsernameCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateProfilePartialUnsavedCallback({
        username: e.target.value,
      });
    },
    [updateProfilePartialUnsavedCallback],
  );

  const usernameError = useMemo(() => {
    const fieldValidationErrors = profilePartialUnsavedErrors.filter(
      (validationError) => validationError.property === 'username',
    );
    const fieldConstraintErrorMsgs = flatten(
      fieldValidationErrors.map((validationError) =>
        values(validationError.constraints),
      ),
    ).map((errorMsg) => `✗ ${errorMsg}`);
    const errorsStr = fieldConstraintErrorMsgs.join(' /n');
    return errorsStr;
  }, [profilePartialUnsavedErrors]);

  useEffect(() => {
    if (profile) {
      const usersUpdateOnePartialDto = pick(profile, [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ]) as UsersUpdateOnePartialDto;
      updateProfilePartialUnsavedCallback(usersUpdateOnePartialDto);
    }

    function onUnmount() {
      updateProfilePartialUnsavedCallback(null);
    }

    return onUnmount;
  }, [profile, updateProfilePartialUnsavedCallback]);

  return (
    <Box>
      <TextField
        id="edit-user-username"
        label="Username"
        name="Username"
        type="text"
        value={profilePartialUnsaved?.username ?? profile?.username}
        onChange={changeUsernameCallback}
        required
        error={!!usernameError}
        helperText={usernameError}
        // disabled={isPending}
      />
    </Box>
  );
};
