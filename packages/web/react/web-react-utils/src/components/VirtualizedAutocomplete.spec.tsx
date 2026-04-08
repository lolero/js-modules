import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest as jestGlobals,
} from '@jest/globals';
import { TextField } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { VirtualizedAutocomplete } from './VirtualizedAutocomplete';

const dataTestId = 'virtualized-autocomplete';

const OPTION_COUNT = 100;
const options = Array.from(
  { length: OPTION_COUNT },
  (_, index) => `Option ${index}`,
);

describe('VirtualizedAutocomplete', () => {
  describe('render', () => {
    it('renders basic VirtualizedAutocomplete', () => {
      render(
        <VirtualizedAutocomplete
          data-testid={dataTestId}
          options={options}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => [props, option] as ReactNode}
        />,
      );

      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  describe('virtualization', () => {
    beforeEach(() => {
      // observeElementRect reads offsetWidth/offsetHeight (not getBoundingClientRect).
      // jsdom always returns 0 for both, so the virtualizer sees an empty viewport
      // and renders nothing. Give every element a concrete height so the virtualizer
      // calculates a real visible range.
      jestGlobals
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockReturnValue(300);
    });

    afterEach(() => {
      jestGlobals.restoreAllMocks();
    });

    it('renders fewer DOM nodes than the total option count', async () => {
      render(
        <VirtualizedAutocomplete
          open
          options={options}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => [props, option] as ReactNode}
        />,
      );

      await waitFor(() => {
        const renderedOptions = screen.queryAllByRole('option');
        expect(renderedOptions.length).toBeGreaterThan(0);
        expect(renderedOptions.length).toBeLessThan(OPTION_COUNT);
      });
    });

    it('renders options at the start of the list and omits those out of view', async () => {
      render(
        <VirtualizedAutocomplete
          open
          options={options}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => [props, option] as ReactNode}
        />,
      );

      await waitFor(() => {
        expect(screen.queryByText('Option 0')).toBeInTheDocument();
      });
      expect(
        screen.queryByText(`Option ${OPTION_COUNT - 1}`),
      ).not.toBeInTheDocument();
    });
  });
});
