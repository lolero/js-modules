import type { AutocompleteProps } from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import noop from 'lodash/noop';
import type React from 'react';
import { useCallback } from 'react';
import type { FormData } from '@js-modules/common-react-utils';
import type { Country } from '@js-modules/common-utils-general';
import { countries, countriesArray } from '@js-modules/common-utils-general';
import type { FormUtilsWeb } from '../hooks/hooksMaterialUi/useFormUtilsWeb';
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
  onChange?: FormUtilsWeb<FormData<string>>['changeFieldCallback'];
  onBlur?: FormUtilsWeb<FormData<string>>['blurFieldCallback'];
  optionProp?: keyof Country;
  dataKey?: string;
};

/**
 * Country-selecting `VirtualizedAutocomplete`, searchable by code, name, native
 * name, and calling codes, writing the chosen `optionProp` back through
 * `onChange`.
 * @param props - Component props.
 * @param props.sx - Autocomplete `sx` override.
 * @param props.required - Whether the field is required.
 * @param props.disabled - Whether the field is disabled.
 * @param props.label - Text field label.
 * @param props.value - Currently selected country key.
 * @param props.error - Whether the field is in an error state.
 * @param props.helperText - Text field helper text.
 * @param props.onChange - Field change handler.
 * @param props.onBlur - Field blur handler.
 * @param props.optionProp - Country property written back as the value (default `code`).
 * @param props.dataKey - `data-key` attribute for form wiring.
 * @returns Countries autocomplete.
 */
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
