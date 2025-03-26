import React, { useCallback } from 'react';
import Button, { buttonClasses } from '@mui/material/Button';
import {
  useStateWeb3WalletConnect,
  WalletType,
} from '@js-modules/apps-dapp-common-store-redux';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

export const DappNavConnectButton: React.FC = () => {
  const {
    request: stateWeb3ConnectWalletRequest,
    reducerMetadata: { wallet },
    callback: stateWeb3ConnectWalletCallback,
  } = useStateWeb3WalletConnect();

  const walletConnectCallback = useCallback(() => {
    stateWeb3ConnectWalletCallback(WalletType.metamask);
  }, [stateWeb3ConnectWalletCallback]);

  if (!wallet && !stateWeb3ConnectWalletRequest?.isPending) {
    return (
      <Button variant="contained" onClick={walletConnectCallback}>
        Connect wallet
      </Button>
    );
  }

  if (!wallet && stateWeb3ConnectWalletRequest?.isPending) {
    return (
      <Button
        variant="contained"
        disabled
        endIcon={<MuiFaIcon icon={faCircleNotch} spin color="inherit" />}
      >
        Connecting...
      </Button>
    );
  }

  if (wallet) {
    return (
      <Button
        sx={{
          [`&.${buttonClasses.disabled}`]: {
            color: 'background.default',
          },
        }}
        variant="contained"
        disabled
        startIcon={<MuiFaIcon icon={faLink} />}
      >
        {`${wallet.account.slice(0, 3)}...${wallet.account.slice(-3)}`}
      </Button>
    );
  }

  return null;
};
