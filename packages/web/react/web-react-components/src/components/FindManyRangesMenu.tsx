import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import Menu from '@mui/material/Menu';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import upperFirst from 'lodash/upperFirst';
import lowerCase from 'lodash/lowerCase';
import isNull from 'lodash/isNull';
import Divider from '@mui/material/Divider';
import {
  FindManyRangesTypes,
  useFindManyRangesUtils,
} from '@js-modules/common-react-hooks';
import { FindManyRangesMenuItem } from './FindManyRangesMenuItem';

export type FindManyRangesMenuProps = {
  rangeTypes: FindManyRangesTypes;
  button: React.ReactElement;
};

export const FindManyRangesMenu: React.FC<FindManyRangesMenuProps> = ({
  rangeTypes,
  button,
}) => {
  const { rangeKeysActive, rangeKeysUnselected, deleteRangeCallback } =
    useFindManyRangesUtils(rangeTypes);

  const [selectedRangeKey, setSelectedRangeKey] = useState<string | null>(null);

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const buttonWithOnClick = useMemo(() => {
    const buttonWithOnClickTemp = React.cloneElement(button, {
      onClick: openMenuCallback,
    } as unknown as React.ReactElement);

    return buttonWithOnClickTemp;
  }, [button, openMenuCallback]);

  const changeSelectedRangeMetadataCallback = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      selectedOption: string | null,
    ) => {
      if (isNull(selectedOption)) {
        return;
      }

      setSelectedRangeKey(selectedOption);
    },
    [],
  );

  const onDeleteRangeCallback = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const rangeKey = event.currentTarget.getAttribute('data-key') as string;
      deleteRangeCallback(rangeKey);
      if (selectedRangeKey === rangeKey) {
        setSelectedRangeKey(null);
      }
    },
    [deleteRangeCallback, selectedRangeKey],
  );

  useEffect(() => {
    if (!isNull(selectedRangeKey)) {
      const isSelectedRangeKeyActive = rangeKeysActive.some(
        (rangeKey) => rangeKey === selectedRangeKey,
      );

      if (isSelectedRangeKeyActive) {
        setSelectedRangeKey(null);
      }
    }
  }, [rangeKeysActive, selectedRangeKey]);

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
              return (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Select filter range"
                />
              );
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
          />
        )}
      </Menu>
    </>
  );
};
