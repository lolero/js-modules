import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import type React from 'react';
import { useStateSettingsReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';

const formControlSx = {
  display: 'flex',
  flexDirection: 'row',
  gap: 1,
};

export const SettingsProfileWorkspaceContentBox: React.FC = () => {
  const { profile } = useStateSettingsReducerMetadata();

  return (
    <Box>
      <FormControl sx={formControlSx}>
        <FormLabel>Username:</FormLabel>
        <Typography>{profile?.username}</Typography>
      </FormControl>
      <FormControl sx={formControlSx}>
        <FormLabel>Email:</FormLabel>
        <Typography>{profile?.email}</Typography>
      </FormControl>
      <FormControl sx={formControlSx}>
        <FormLabel>Phone number:</FormLabel>
        <Typography>{profile?.phoneNumber}</Typography>
      </FormControl>
      <FormControl sx={formControlSx}>
        <FormLabel>First name:</FormLabel>
        <Typography>{profile?.firstName}</Typography>
      </FormControl>
      <FormControl sx={formControlSx}>
        <FormLabel>Middle name:</FormLabel>
        <Typography>{profile?.middleName}</Typography>
      </FormControl>
      <FormControl sx={formControlSx}>
        <FormLabel>Last name:</FormLabel>
        <Typography>{profile?.lastName}</Typography>
      </FormControl>
    </Box>
  );
};
