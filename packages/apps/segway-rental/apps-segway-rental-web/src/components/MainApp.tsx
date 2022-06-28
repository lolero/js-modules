import React, { FunctionComponent, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createReduxStore } from '@js-modules/apps-segway-rental-store-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  NavContextValue,
  NavDrawerDisplayStatus,
  NavContext,
} from '@js-modules/web-react-nav';
import MainRoutes from './MainRoutes';
import { lightTheme } from '../styles/segwayRentalMaterialUiTheme';
import MainNavSideToolbarBox from './MainNavSideToolbarBox';
import MainNavSideFooterBox from './MainNavSideFooterBox';

/**
 *
 */
function initApp(): FunctionComponent {
  const reduxStore = createReduxStore();

  const App: FunctionComponent = () => {
    const [navSideDrawerDisplayStatus, setNavSideDrawerDisplayStatus] =
      useState<NavDrawerDisplayStatus>(NavDrawerDisplayStatus.expanded);

    const navContextValue: NavContextValue = useMemo(() => {
      return {
        shortLogo: null,
        longLogo: null,
        homePath: '/',
        sideToolbar: <MainNavSideToolbarBox />,
        sideFooter: <MainNavSideFooterBox />,
        nonAuthenticatedRedirectPath: '/',
        navLeftDrawerDisplayStatus: navSideDrawerDisplayStatus,
        setNavLeftDrawerDisplayStatus: setNavSideDrawerDisplayStatus,
      };
    }, [navSideDrawerDisplayStatus]);

    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <BrowserRouter>
            <NavContext.Provider value={navContextValue}>
              <MainRoutes />
            </NavContext.Provider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  return App;
}

export default initApp();
