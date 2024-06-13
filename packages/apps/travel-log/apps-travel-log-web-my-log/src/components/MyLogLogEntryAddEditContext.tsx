import React from 'react';
import { FormValidator } from '@js-modules/web-react-hooks';
import { NodeLogEntry } from '@js-modules/apps-travel-log-common-store-redux';

export type MyLogLogEntryAddEditContextValue = {
  nodeLogEntryUnsavedFormValidator: FormValidator<NodeLogEntry>;
};

export const MyLogLogEntryAddEditContext =
  React.createContext<MyLogLogEntryAddEditContextValue>({
    nodeLogEntryUnsavedFormValidator: {
      formErrors: {},
      validateCallback: () => ({}),
    },
  });
