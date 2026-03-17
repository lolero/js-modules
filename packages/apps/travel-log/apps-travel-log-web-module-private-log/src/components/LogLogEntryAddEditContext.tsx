import React from 'react';
import { FormValidator } from '@js-modules/web-react-utils';
import { NodeLogEntry } from '@js-modules/apps-travel-log-common-store-redux';

export type LogLogEntryAddEditContextValue = {
  nodeLogEntryUnsavedFormValidator: FormValidator<NodeLogEntry>;
};

export const LogLogEntryAddEditContext =
  React.createContext<LogLogEntryAddEditContextValue>({
    nodeLogEntryUnsavedFormValidator: {
      formErrors: {},
      validateCallback: () => ({}),
    },
  });
