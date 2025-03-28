import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemePalette } from '@js-modules/apps-travel-log-common-store-redux/src/reducers/appState/stateMain/stateMain.types';
import CssBaseline from '@mui/material/CssBaseline';
import { materialUiThemes } from '@js-modules/apps-travel-log-web-components';
import { KcPage } from './kc.gen';

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase
/*
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {}
    });
}
*/

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <ThemeProvider theme={materialUiThemes[ThemePalette.dark]}>
      <CssBaseline />
      {!window.kcContext ? (
        <h1>No Keycloak Context</h1>
      ) : (
        <KcPage kcContext={window.kcContext} />
      )}
    </ThemeProvider>
    ,
  </StrictMode>,
);
