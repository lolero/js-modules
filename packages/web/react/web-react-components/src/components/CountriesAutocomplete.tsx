import React, { useCallback } from 'react';
import {
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import {
  countries,
  countriesArray,
  Country,
} from '@js-modules/common-utils-general';
import { FormUtils } from '@js-modules/web-react-hooks';
import noop from 'lodash/noop';
import { VirtualizedAutocomplete } from './VirtualizedAutocomplete';

const filterOptions = createFilterOptions({
  stringify: (country: Country) => {
    const searchValues = [
      country.code,
      country.name,
      country.callingCodes.join(' '),
      country.nameNative,
    ];
    const searchStr = searchValues.join(' ');

    return searchStr;
  },
});

export type CountriesAutocompleteProps<
  OptionT,
  MultipleT extends boolean | undefined = undefined,
  DisableClearableT extends boolean | undefined = undefined,
  FreeSoloT extends boolean | undefined = undefined,
> = {
  sx?: AutocompleteProps<
    OptionT,
    MultipleT,
    DisableClearableT,
    FreeSoloT
  >['sx'];
  required?: TextFieldProps['required'];
  disabled?: TextFieldProps['disabled'];
  label?: TextFieldProps['label'];
  value: string;
  error?: TextFieldProps['error'];
  helperText?: TextFieldProps['helperText'];
  onChange?: FormUtils<Record<string, any>>['changeFieldCallback'];
  onBlur?: FormUtils<Record<string, any>>['blurFieldCallback'];
  optionProp?: keyof Country;
  dataKey?: string;
};

export function CountriesAutocomplete<
  OptionT,
  MultipleT extends boolean | undefined = undefined,
  DisableClearableT extends boolean | undefined = undefined,
  FreeSoloT extends boolean | undefined = undefined,
>({
  sx,
  required,
  disabled,
  label,
  value,
  error,
  helperText,
  onChange = noop,
  onBlur,
  optionProp = 'code',
  dataKey,
}: CountriesAutocompleteProps<
  OptionT,
  MultipleT,
  DisableClearableT,
  FreeSoloT
>) {
  const changeCallback = useCallback(
    (
      e: React.SyntheticEvent<Element, Event>,
      selectedOption: Country | null,
    ) => {
      const eInput = e as React.ChangeEvent<HTMLInputElement>;
      eInput.target.value = (selectedOption?.[optionProp] as string) ?? '';
      if (dataKey) {
        eInput.currentTarget.setAttribute('data-key', dataKey);
      }
      onChange(eInput);
    },
    [optionProp, dataKey, onChange],
  );

  return (
    <VirtualizedAutocomplete
      sx={sx}
      disabled={disabled}
      options={countriesArray}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return [
          props,
          <>
            <ListItemIcon>{option.flag}</ListItemIcon>
            <ListItemText>{option.name}</ListItemText>
          </>,
        ] as React.ReactNode;
      }}
      renderInput={(params) => {
        return (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            required={required}
            label={label}
            error={error}
            helperText={helperText}
          />
        );
      }}
      value={countries[value] ?? null}
      onChange={changeCallback}
      onBlur={onBlur as React.FocusEventHandler<HTMLDivElement>}
      data-key={dataKey}
    />
  );
}
