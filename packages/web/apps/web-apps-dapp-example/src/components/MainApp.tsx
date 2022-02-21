import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createReduxStore } from '@dapp-example/common-stores-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { materialUiTheme } from '@dapp-example/web-utils-styles';
import MainRoutesBox from './MainRoutesBox';

/**
 *
 */
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
