import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {
  AuthMethods,
  createStateAuthLoginRequestAction,
  createStateAuthLogoutRequestAction,
  useStateAuthReducerMetadata,
  useStateAuthRequest,
} from '@js-modules/apps-segway-rental-store-redux';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import MainLogoBox from './MainLogoBox';
import MainNavMenu from './MainNavMenu';
import MainNavBarUserMenu from './MainNavBarUserMenu';

const MainNavBar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const dispatch = useDispatch();

    const [loginRequestId, setLoginRequestId] = useState<string | null>(null);
    const loginRequest = useStateAuthRequest(loginRequestId || '');

    const { authUser } = useStateAuthReducerMetadata();

    const loginCallback = useCallback(() => {
      const loginAction = createStateAuthLoginRequestAction(AuthMethods.google);
      dispatch(loginAction);
      setLoginRequestId(loginAction.requestId);
    }, [dispatch]);

    const logoutCallback = useCallback(() => {
      const logoutAction = createStateAuthLogoutRequestAction();
      dispatch(logoutAction);
      setLoginRequestId(null);
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
          {authUser && !loginRequest?.isPending ? (
            <MainNavBarUserMenu logoutCallback={logoutCallback} />
          ) : (
            <Button
              variant="contained"
              startIcon={<MuiFaIcon icon={faSignInAlt} />}
              endIcon={
                loginRequest?.isPending && (
                  <MuiFaIcon icon={faCircleNotch} spin color="inherit" />
                )
              }
              disabled={loginRequest?.isPending}
              onClick={loginCallback}
            >
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  },
);

export const MainNavBarRaw = MainNavBar;
export const MainNavBarMemo = React.memo(MainNavBarRaw);
export default MainNavBarMemo;
