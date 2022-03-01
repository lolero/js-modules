import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStateWeb3Metadata,
  createStateWeb3WalletConnectRequestAction,
  WalletType,
} from '@js-modules/common-stores-dapp-example-redux';

const HomeBox: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { isConnectedToNetwork, wallet } = useSelector(selectStateWeb3Metadata);

  const connectToWalletCallback = useCallback(() => {
    const connectToWalletRequestAction =
      createStateWeb3WalletConnectRequestAction(WalletType.metamask);
    dispatch(connectToWalletRequestAction);
  }, [dispatch]);

  return (
    <Box>
      <Typography>isConnectedToNetwork: {`${isConnectedToNetwork}`}</Typography>
      <Typography>walletType: {`${wallet?.walletType}`}</Typography>
      <Typography>network: {`${wallet?.network.name}`}</Typography>
      <Typography>network: {`${wallet?.network.ensAddress}`}</Typography>
      <Typography>network: {`${wallet?.network.chainId}`}</Typography>
      <Typography>accountAddress: {`${wallet?.accountAddress}`}</Typography>
      <Button onClick={connectToWalletCallback}>Connect Wallet</Button>
    </Box>
  );
};

export default HomeBox;
