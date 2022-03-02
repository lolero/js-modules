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

  const { network, wallet } = useSelector(selectStateWeb3Metadata);

  const connectToWalletCallback = useCallback(() => {
    const connectToWalletRequestAction =
      createStateWeb3WalletConnectRequestAction(WalletType.metamask);
    dispatch(connectToWalletRequestAction);
  }, [dispatch]);

  return (
    <Box>
      <Typography>network.chainId: {`${network?.chainId}`}</Typography>
      <Typography>network.isConnected: {`${network?.isConnected}`}</Typography>
      <Typography>wallet.walletType: {`${wallet?.walletType}`}</Typography>
      <Button onClick={connectToWalletCallback} disabled={!!wallet}>
        {wallet
          ? `Connected to: ${wallet.account.slice(
              0,
              3,
            )}...${wallet.account.slice(-3)}`
          : 'Connect Wallet'}
      </Button>
    </Box>
  );
};

export default HomeBox;
