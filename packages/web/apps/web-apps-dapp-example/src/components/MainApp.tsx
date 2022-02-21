import React, { FunctionComponent } from 'react';
import { getIsBrowser } from '@dapp-example/common-utils-general';

const MainApp: FunctionComponent = () => {
  const isBrowser = getIsBrowser();

  return (
    <div>
      <p>isBrowser: {`${isBrowser}`}</p>
    </div>
  );
};

export default MainApp;
