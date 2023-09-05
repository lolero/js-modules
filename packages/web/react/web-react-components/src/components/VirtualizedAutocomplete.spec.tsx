import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TextField } from '@mui/material';
import { VirtualizedAutocomplete } from './VirtualizedAutocomplete';

const dataTestId = 'virtualized-autocomplete';

describe('VirtualizedAutocomplete', () => {
  it('Should render basic VirtualizedAutocomplete', () => {
    render(
      <VirtualizedAutocomplete
        data-testid={dataTestId}
        options={Array(100)
          .fill(0)
          .map((value, index) => `Option ${index}`)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Option" />}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => {
          return [props, option] as React.ReactNode;
        }}
      />,
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
