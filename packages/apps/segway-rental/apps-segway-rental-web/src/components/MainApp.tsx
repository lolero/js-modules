import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createReduxStore } from '@js-modules/apps-segway-rental-store-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import MainRouterSwitch from './MainRouterBox';
import { segwayRentalMaterialUiTheme } from '../styles/segwayRentalMaterialUiTheme';

/**
 *
 */
function initApp(): FunctionComponent {
  const reduxStore = createReduxStore();

  const App: FunctionComponent = () => {
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={segwayRentalMaterialUiTheme}>
          <CssBaseline />
          <BrowserRouter>
            <MainRouterSwitch />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  return App;
}

export default initApp();
