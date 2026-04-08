import { createContext } from 'react';
import type { NodeLogEntry } from '@js-modules/apps-travel-log-common-store-redux';
import type { FormValidator } from '@js-modules/common-react-utils';

export type LogLogEntryAddEditContextValue = {
  nodeLogEntryUnsavedFormValidator: FormValidator<NodeLogEntry>;
};

export const LogLogEntryAddEditContext =
  createContext<LogLogEntryAddEditContextValue>({
    nodeLogEntryUnsavedFormValidator: {
      formErrors: {},
      validateCallback: () => ({}),
    },
  });
