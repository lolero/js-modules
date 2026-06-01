import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { materialUiThemes } from '@js-modules/apps-dapp-web-utils';
import { DocsMui } from '@js-modules/web-react-docs-mui';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <DocsMui themes={materialUiThemes} />
  </StrictMode>,
);
