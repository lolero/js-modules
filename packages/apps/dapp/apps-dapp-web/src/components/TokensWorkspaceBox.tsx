import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Avatar,
  avatarClasses,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {
  NodeChain,
  selectNodeChainsData,
  useGetNodeChainsRequest,
} from '@js-modules/apps-dapp-store-redux';
import { autocompleteSx } from '@js-modules/web-styles-material-ui';
import { useSelector } from 'react-redux';
import { orderBy, values } from 'lodash';
import Icon from '@mui/material/Icon';
import { VirtualizedAutocomplete } from '@js-modules/web-react-components';
import { usePrevious } from '@js-modules/common-react-hooks';

const TokensWorkspaceBox: React.FunctionComponent = () => {
  const getNodeChainsRequest = useGetNodeChainsRequest();
  const getNodeChainsRequestPrevious = usePrevious(getNodeChainsRequest);

  const nodeChains = useSelector(selectNodeChainsData);

  const sortedNodeChains = useMemo(() => {
    return orderBy(values(nodeChains), 'name', 'asc');
  }, [nodeChains]);

  const [selectedChain, setSelectedChain] = useState<NodeChain | null>(null);

  const changeChainCallback = useCallback((e, nodeChain) => {
    setSelectedChain(nodeChain);
  }, []);

  useEffect(() => {
    if (
      getNodeChainsRequestPrevious?.isPending &&
      !getNodeChainsRequest?.isPending
    ) {
      setSelectedChain(nodeChains[1]);
    }
  }, [
    getNodeChainsRequest,
    getNodeChainsRequestPrevious,
    nodeChains,
    selectedChain,
  ]);

  return (
    <Box>
      <VirtualizedAutocomplete
        sx={{
          ...autocompleteSx,
          mt: '1em',
        }}
        options={sortedNodeChains}
        getOptionLabel={(nodeChain) => nodeChain.name}
        groupBy={(nodeChain) => nodeChain.name[0]}
        popupIcon={
          getNodeChainsRequest?.isPending ? (
            <Icon className="fas fa-circle-notch fa-spin" />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        disabled={getNodeChainsRequest?.isPending}
        value={selectedChain}
        onChange={changeChainCallback}
        renderInput={(params) => {
          if (!selectedChain) {
            return (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Chain"
              />
            );
          }

          return (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Chain"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        width: '1.5em',
                        height: '1.5em',
                        // mx: '.5em',
                        borderRadius: 0,
                        [`& .${avatarClasses.img}`]: {
                          objectFit: 'scale-down',
                        },
                      }}
                      src={selectedChain.iconUrl}
                    />
                  </InputAdornment>
                ),
                endAdornment: params.InputProps.endAdornment,
              }}
            />
          );
        }}
        renderOption={(props, nodeChain) => {
          return [
            props,
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
            </Box>,
          ];
        }}
        renderGroup={(params) => params}
      />
    </Box>
  );
};

export default TokensWorkspaceBox;
