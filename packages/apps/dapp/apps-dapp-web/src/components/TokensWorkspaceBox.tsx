import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Autocomplete from '@mui/material/Autocomplete';
import { Avatar, avatarClasses, TextField, Typography } from '@mui/material';
import {
  NodeChain,
  selectNodeChainsData,
  useGetNodeChainsRequest,
} from '@js-modules/apps-dapp-store-redux';
import { autocompleteSx } from '@js-modules/web-styles-material-ui';
import { useSelector } from 'react-redux';
import { orderBy, values } from 'lodash';
import Icon from '@mui/material/Icon';
import VirtualizedAutocomplete from './VirtualizedAutocomplete';

const TokensWorkspaceBox: React.FunctionComponent = () => {
  const getNodeChainsRequest = useGetNodeChainsRequest();

  const nodeChains = useSelector(selectNodeChainsData);

  const sortedNodeChains = useMemo(() => {
    return orderBy(values(nodeChains), 'name', 'asc');
  }, [nodeChains]);

  return (
    <Box>
      <Autocomplete
        sx={{
          ...autocompleteSx,
          mt: '1em',
        }}
        id="tokens-chain"
        disableClearable
        options={sortedNodeChains}
        getOptionLabel={(nodeChain: NodeChain) => nodeChain.name}
        popupIcon={
          getNodeChainsRequest?.isPending ? (
            <Icon className="fas fa-circle-notch fa-spin" />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        renderOption={(option, nodeChain) => {
          return (
            <Box
              key={nodeChain.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: '1.5em',
                  height: '1.5em',
                  mx: '.5em',
                  borderRadius: 0,
                  [`& .${avatarClasses.img}`]: {
                    objectFit: 'scale-down',
                  },
                }}
                src={nodeChain.iconUrl}
              />
              <Typography>{nodeChain.name}</Typography>
            </Box>
          );
        }}
        // value={role}
        // disabled={isRequestPending}
        // onChange={changeRoleCallback}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Chain"
          />
        )}
      />
      <VirtualizedAutocomplete />
    </Box>
  );
};

export default TokensWorkspaceBox;
