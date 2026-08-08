import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import isNull from 'lodash/isNull';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import type React from 'react';
import { cloneElement, useState } from 'react';
import type {
  FindManyRangesTypes,
  SetSearchParams,
} from '@js-modules/common-react-utils';
import { useFindManyRangesUtils } from '@js-modules/common-react-utils';
import { useMenuUtils } from '../hooks/hooksMaterialUi/useMenuUtils';
import { FindManyRangesMenuItem } from './FindManyRangesMenuItem';

export type FindManyRangesMenuProps = {
  rangeTypes: FindManyRangesTypes;
  button: React.ReactElement;
  searchParams: URLSearchParams;
  setSearchParams: SetSearchParams;
};

/**
 * Menu of find-many range filters driven by URL search params. `searchParams`
 * and `setSearchParams` are injected by the consumer (react-router
 * `useSearchParams` or a Next.js adapter), keeping the component router-agnostic.
 * @param props - Component props.
 * @param props.rangeTypes - Map of range keys to their value types.
 * @param props.button - Element that opens the menu (cloned to add `onClick`).
 * @param props.searchParams - Current URL search params.
 * @param props.setSearchParams - Setter for the URL search params.
 * @returns FindManyRangesMenu.
 */
export function FindManyRangesMenu({
  rangeTypes,
  button,
  searchParams,
  setSearchParams,
}: FindManyRangesMenuProps): React.ReactNode {
  const { rangeKeysActive, rangeKeysUnselected, deleteRangeCallback } =
    useFindManyRangesUtils(searchParams, setSearchParams, rangeTypes);

  const [selectedRangeKey, setSelectedRangeKey] = useState<string | null>(null);

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const buttonWithOnClick = cloneElement(button, {
    onClick: openMenuCallback,
  } as unknown as React.ReactElement);

  function changeSelectedRangeMetadataCallback(
    _e: React.SyntheticEvent<Element, Event>,
    selectedOption: string | null,
  ): void {
    if (isNull(selectedOption)) {
      return;
    }

    setSelectedRangeKey(selectedOption);
  }

  function onDeleteRangeCallback(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    const rangeKey = event.currentTarget.getAttribute('data-key') as string;
    deleteRangeCallback(rangeKey);
    if (selectedRangeKey === rangeKey) {
      setSelectedRangeKey(null);
    }
  }

  if (
    !isNull(selectedRangeKey) &&
    rangeKeysActive.some((rangeKey) => rangeKey === selectedRangeKey)
  ) {
    setSelectedRangeKey(null);
  }

  return (
    <>
      {buttonWithOnClick}
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        {rangeKeysUnselected.length > 0 && (
          <Autocomplete
            key={selectedRangeKey}
            sx={{
              px: 2,
              pt: 1,
              width: '380px',
            }}
            options={rangeKeysUnselected}
            getOptionLabel={(option) => upperFirst(lowerCase(option))}
            renderInput={(params) => {
              return <TextField {...params} label="Select filter range" />;
            }}
            value={null}
            onChange={changeSelectedRangeMetadataCallback}
          />
        )}
        {rangeKeysActive.length > 0 && (
          <Divider
            sx={{
              mt: 1,
            }}
          />
        )}
        {rangeKeysActive.map((rangeKey) => {
          return (
            <FindManyRangesMenuItem
              key={`${rangeKey}-${rangeTypes[rangeKey]}`}
              rangeKey={rangeKey}
              rangeType={rangeTypes[rangeKey]}
              deleteRangeCallback={onDeleteRangeCallback}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          );
        })}
        {!isNull(selectedRangeKey) && (
          <Divider
            sx={{
              mt: 1,
            }}
          />
        )}
        {!isNull(selectedRangeKey) && (
          <FindManyRangesMenuItem
            rangeKey={selectedRangeKey}
            rangeType={rangeTypes[selectedRangeKey]}
            deleteRangeCallback={onDeleteRangeCallback}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </Menu>
    </>
  );
}
