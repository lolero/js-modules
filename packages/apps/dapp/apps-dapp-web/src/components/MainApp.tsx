import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createReduxStore } from '@js-modules/apps-dapp-store-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import MainRoutesBox from './MainRoutesBox';
import { materialUiTheme } from '../styles/materialUiTheme';

function initApp(): FunctionComponent {
  const reduxStore = createReduxStore();

  const App: FunctionComponent = () => {
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={materialUiTheme}>
          <CssBaseline />
          <BrowserRouter>
            <MainRoutesBox />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  return App;
}

export default initApp();
