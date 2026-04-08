import _isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import { useCallback, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import type { FormErrors, FormValidator } from '@js-modules/common-react-utils';
import { useNodeLogEntriesReducerMetadata } from './nodeLogEntries.hooks';
import type { NodeLogEntry } from './nodeLogEntries.types';

export function useNodeLogEntriesValidateNodeLogEntryUnsaved(): FormValidator<NodeLogEntry> {
  const { nodeLogEntryUnsaved } = useNodeLogEntriesReducerMetadata();

  const [formErrors, setFormErrors] = useState<FormErrors<NodeLogEntry>>({});

  const validateCallback = useCallback(
    (fieldNames: (keyof NodeLogEntry)[] = []) => {
      const formErrorsTemp: FormErrors<NodeLogEntry> = { ...formErrors };

      if (_isEmpty(fieldNames) || fieldNames.includes('title')) {
        const fieldErrors: string[] = [];

        if (isEmpty(nodeLogEntryUnsaved!.title)) {
          fieldErrors.push('Enter title');
        }

        formErrorsTemp.title = fieldErrors;
      }

      const formErrorsClean: FormErrors<NodeLogEntry> = pickBy(
        formErrorsTemp,
        (fieldErrors) => fieldErrors!.length > 0,
      );
      setFormErrors(formErrorsClean);
      return formErrorsClean;
    },
    [formErrors, nodeLogEntryUnsaved],
  );

  return {
    formErrors,
    validateCallback,
  };
}
