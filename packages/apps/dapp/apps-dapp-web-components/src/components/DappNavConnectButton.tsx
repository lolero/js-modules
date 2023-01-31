import React, { useCallback, useState } from 'react';
import Button, { buttonClasses } from '@mui/material/Button';
import {
  createStateWeb3WalletConnectRequestAction,
  selectStateWeb3Metadata,
  selectStateWeb3Requests,
  WalletType,
} from '@js-modules/apps-dapp-common-stores-redux';
import { useDispatch, useSelector } from 'react-redux';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';

export const DappNavConnectButton: React.FC = () => {
  const dispatch = useDispatch();

  const [connectWalletRequestId, setConnectWalletRequestId] = useState<
    string | null
  >(null);
  const stateWeb3Requests = useSelector(selectStateWeb3Requests);
  const connectWalletRequest = stateWeb3Requests[connectWalletRequestId || ''];

  const { wallet } = useSelector(selectStateWeb3Metadata);

  const connectWalletCallback = useCallback(() => {
    const connectWalletAction = createStateWeb3WalletConnectRequestAction(
      WalletType.metamask,
    );
    dispatch(connectWalletAction);
    setConnectWalletRequestId(connectWalletAction.requestId);
  }, [dispatch]);

  if (!wallet && !connectWalletRequest?.isPending) {
    return (
      <Button variant="contained" onClick={connectWalletCallback}>
        Connect wallet
      </Button>
    );
  }

  if (!wallet && connectWalletRequest?.isPending) {
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
