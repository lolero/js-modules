import type { AutocompleteProps } from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import noop from 'lodash/noop';
import pick from 'lodash/pick';
import values from 'lodash/values';
import type React from 'react';
import { useCallback } from 'react';
import type { FormData } from '@js-modules/common-react-utils';
import type { CallingCode } from '@js-modules/common-utils-general';
import {
  callingCodes,
  callingCodesArray,
  countries,
} from '@js-modules/common-utils-general';
import type { FormUtilsWeb } from '../hooks/hooksMaterialUi/useFormUtilsWeb';
import { VirtualizedAutocomplete } from './VirtualizedAutocomplete';

const filterOptions = createFilterOptions({
  stringify: (callingCode: CallingCode) => {
    const callingCodeCountries = values(
      pick(countries, callingCode.countryCodes),
    );
    const countryNames = callingCodeCountries
      .map((country) => country.name)
      .join(' ');
    const countryNamesNative = callingCodeCountries
      .map((country) => country.nameNative)
      .join(' ');
    const searchValues = [
      callingCode.callingCode,
      callingCode.countryCodes.join(' '),
      countryNames,
      countryNamesNative,
    ];
    const searchStr = searchValues.join(' ');

    return searchStr;
  },
});

export type CallingCodesAutocompleteProps<
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
  optionProp?: keyof CallingCode;
  dataKey?: string;
};

export function CallingCodesAutocomplete<
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
  optionProp = 'callingCode',
  dataKey,
}: CallingCodesAutocompleteProps<
  OptionT,
  MultipleT,
  DisableClearableT,
  FreeSoloT
>) {
  const changeCallback = useCallback(
    (
      e: React.SyntheticEvent<Element, Event>,
      selectedOption: CallingCode | null,
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
      sx={{
        width: '200px',
        ...sx,
      }}
      disabled={disabled}
      options={callingCodesArray}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.callingCode}
      renderOption={(props, option) => {
        const callingCodeCountries = values(
          pick(countries, option.countryCodes),
        );
        const calllingCodeFlags = callingCodeCountries
          .map((country) => country.flag)
          .join(' ');
        return [
          props,
          <ListItemText key={option.callingCode}>
            {option.callingCode} ({calllingCodeFlags})
          </ListItemText>,
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
      value={callingCodes[value] ?? null}
      onChange={changeCallback}
      onBlur={onBlur as React.FocusEventHandler<HTMLDivElement>}
      data-key={dataKey}
      slotProps={{
        paper: {
          sx: {
            width: '180px',
          },
        },
      }}
    />
  );
}
