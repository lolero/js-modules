import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faFont } from '@fortawesome/free-solid-svg-icons/faFont';
import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Box from '@mui/material/Box';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';
import type React from 'react';
import type { SetSearchParams } from '@js-modules/common-react-utils';
import { FindManyRangeType } from '@js-modules/common-react-utils';
import { FindManyRangeBoxDate } from './FindManyRangeBoxDate';
import { MuiFaIcon } from './MuiFaIcon';

export type FindManyDateRangesMenuItemProps = {
  rangeKey: string;
  rangeType: FindManyRangeType;
  deleteRangeCallback: IconButtonProps['onClick'];
  searchParams: URLSearchParams;
  setSearchParams: SetSearchParams;
};

/**
 * Menu item for a single find-many range: a labeled icon plus the range's
 * date box and a delete button. Search-param state is injected and forwarded to
 * `FindManyRangeBoxDate`, keeping the component router-agnostic.
 * @param props - Component props.
 * @param props.rangeKey - Range key for this item.
 * @param props.rangeType - Range value type (date/number/string).
 * @param props.deleteRangeCallback - Click handler to delete this range.
 * @param props.searchParams - Current URL search params.
 * @param props.setSearchParams - Setter for the URL search params.
 * @returns FindManyRangesMenuItem.
 */
export function FindManyRangesMenuItem({
  rangeKey,
  rangeType,
  deleteRangeCallback,
  searchParams,
  setSearchParams,
}: FindManyDateRangesMenuItemProps): React.ReactNode {
  return (
    <MenuItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 1,
        }}
      >
        {rangeType === FindManyRangeType.date && (
          <MuiFaIcon icon={faCalendarDays} fontSize="small" />
        )}
        {rangeType === FindManyRangeType.number && (
          <MuiFaIcon icon={faHashtag} fontSize="small" />
        )}
        {rangeType === FindManyRangeType.string && (
          <MuiFaIcon icon={faFont} fontSize="small" />
        )}
        <Typography>{upperFirst(lowerCase(rangeKey))}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {rangeType === FindManyRangeType.date && (
          <FindManyRangeBoxDate
            rangeKey={rangeKey}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        {rangeType === FindManyRangeType.number && (
          <FindManyRangeBoxDate
            rangeKey={rangeKey}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        {rangeType === FindManyRangeType.string && (
          <FindManyRangeBoxDate
            rangeKey={rangeKey}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        <IconButton
          sx={{
            ml: 1,
          }}
          edge="end"
          size="small"
          onClick={deleteRangeCallback}
          data-key={rangeKey}
        >
          <MuiFaIcon icon={faXmark} />
        </IconButton>
      </Box>
    </MenuItem>
  );
}
