import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type React from 'react';
import { useCallback, useContext } from 'react';
import { DocsMuiContext } from '../contexts/DocsMuiContext';

export function DocsMuiThemeAutocomplete(): React.ReactNode {
  const { themeKeys, themeKeySelected, setThemeKeySelected } =
    useContext(DocsMuiContext);

  const onChangeCallback = useCallback(
    (_e: React.SyntheticEvent<Element, Event>, themeKeyNew: string) => {
      setThemeKeySelected(themeKeyNew);
    },
    [setThemeKeySelected],
  );

  return (
    <Autocomplete
      disableClearable
      options={themeKeys}
      value={themeKeySelected}
      onChange={onChangeCallback}
      renderInput={(params) => <TextField {...params} label="Theme" />}
      size="small"
      sx={{ minWidth: 200 }}
    />
  );
}
