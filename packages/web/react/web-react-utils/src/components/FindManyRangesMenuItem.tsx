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
import { FindManyRangeType } from '@js-modules/common-react-utils';
import { FindManyRangeBoxDate } from './FindManyRangeBoxDate';
import { MuiFaIcon } from './MuiFaIcon';

export type FindManyDateRangesMenuItemProps = {
  rangeKey: string;
  rangeType: FindManyRangeType;
  deleteRangeCallback: IconButtonProps['onClick'];
};

export const FindManyRangesMenuItem: React.FC<
  FindManyDateRangesMenuItemProps
> = ({ rangeKey, rangeType, deleteRangeCallback }) => {
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
          <FindManyRangeBoxDate rangeKey={rangeKey} />
        )}
        {rangeType === FindManyRangeType.number && (
          <FindManyRangeBoxDate rangeKey={rangeKey} />
        )}
        {rangeType === FindManyRangeType.string && (
          <FindManyRangeBoxDate rangeKey={rangeKey} />
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
};
