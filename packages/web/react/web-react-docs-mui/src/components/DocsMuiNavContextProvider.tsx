import type React from 'react';
import { NavContextProvider } from '@js-modules/web-react-nav';
import { DocsMuiBrowserRouter } from './DocsMuiBrowserRouter';

export function DocsMuiNavContextProvider(): React.ReactNode {
  return (
    <NavContextProvider nonAuthenticatedRedirectPath="/">
      <DocsMuiBrowserRouter />
    </NavContextProvider>
  );
}
