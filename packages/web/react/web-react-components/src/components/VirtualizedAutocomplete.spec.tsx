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
        renderInput={(params) => <TextField {...params} label="Option" />}
      />,
    );

    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
