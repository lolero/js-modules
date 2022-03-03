import React, { forwardRef, useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStateWeb3WalletConnectRequestAction,
  selectStateWeb3Metadata,
  selectStateWeb3Requests,
  WalletType,
} from '@js-modules/common-stores-dapp-example-redux';
import MainLogoBox from './MainLogoBox';
import MainNavMenu from './MainNavMenu';

const MainNavBar = forwardRef<HTMLDivElement>((props, ref) => {
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

  return (
    <AppBar
      sx={{
        display: 'flex',
        justifyContent: 'end',
      }}
      ref={ref}
      position="fixed"
    >
      <Toolbar
        sx={{
          px: '.5em !important',
        }}
        variant="dense"
      >
        <MainLogoBox />
        <Divider
          sx={{
            ml: '10px',
            my: '6px',
            backgroundColor: 'background.default',
            width: '2px',
          }}
          orientation="vertical"
          flexItem
        />
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexGrow: 1,
          }}
        >
          <MainNavMenu />
        </Box>
        {!wallet && !connectWalletRequest?.isPending && (
          <Button variant="contained" onClick={connectWalletCallback}>
            Connect Wallet
          </Button>
        )}
        {!wallet && connectWalletRequest?.isPending && (
          <Button
            variant="contained"
            disabled
            endIcon={
              <Icon className="fas fa-circle-notch fa-spin" color="inherit" />
            }
          >
            Connecting...
          </Button>
        )}
        {wallet && (
          <Button
            sx={{
              '&.Mui-disabled': {
                color: 'background.default',
              },
            }}
            variant="contained"
            disabled
            startIcon={<Icon className="fas fa-link" />}
          >
            {`${wallet.account.slice(0, 3)}...${wallet.account.slice(-3)}`}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});

export const MainNavBarRaw = MainNavBar;
export const MainNavBarMemo = React.memo(MainNavBarRaw);
export default MainNavBarMemo;
