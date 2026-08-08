import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type React from 'react';
import { useContext } from 'react';
import { DocsMuiContext } from '../contexts/DocsMuiContext';

export function DocsMuiThemeAutocomplete(): React.ReactNode {
  const { themeKeys, themeKeySelected, setThemeKeySelected } =
    useContext(DocsMuiContext);

  function onChangeCallback(
    _e: React.SyntheticEvent<Element, Event>,
    themeKeyNew: string,
  ): void {
    setThemeKeySelected(themeKeyNew);
  }

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
