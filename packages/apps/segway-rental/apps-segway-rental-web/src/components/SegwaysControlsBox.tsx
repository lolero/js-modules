import React, { useCallback, useContext } from 'react';
import {
  createStateDialogsUpdateWholeReducerMetadataRequestAction,
  selectNodeSegwaysColors,
  selectNodeSegwaysLocations,
  selectNodeSegwaysModels,
  UserRoles,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { Autocomplete, Fab } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { autocompleteSx } from '@js-modules/web-styles-material-ui';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import SegwaysContext from './SegwaysContext';

const enhancedAutocompleteSx = {
  ...autocompleteSx,
  width: '12em',
  mr: '.5em',
} as const;

const SegwaysControlsBox: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { filterDates, filterModel, filterColor, filterLocation } =
    useContext(SegwaysContext);

  const { authUserRole } = useStateAuthReducerMetadata();

  const segwayModels = useSelector(selectNodeSegwaysModels);
  const segwayColors = useSelector(selectNodeSegwaysColors);
  const segwayLocations = useSelector(selectNodeSegwaysLocations);

  const createSegwayCallback = useCallback(() => {
    const openEditDialogRequestAction =
      createStateDialogsUpdateWholeReducerMetadataRequestAction({
        segwaysEditDialogMetadata: {
          nodeSegwayPk: null,
        },
      });
    dispatch(openEditDialogRequestAction);
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: '5em',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        pt: '1em',
        pr: '.5em',
      }}
    >
      <Autocomplete
        sx={enhancedAutocompleteSx}
        id="segway-filter-model"
        options={segwayModels}
        fullWidth
        getOptionLabel={(option) => option}
        value={filterModel.value}
        onChange={filterModel.changeCallback}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Filter by Model"
          />
        )}
      />
      <Autocomplete
        sx={enhancedAutocompleteSx}
        id="segway-filter-color"
        options={segwayColors}
        fullWidth
        getOptionLabel={(option) => option}
        value={filterColor.value}
        onChange={filterColor.changeCallback}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Filter by Color"
          />
        )}
      />
      <Autocomplete
        sx={enhancedAutocompleteSx}
        id="segway-filter-location"
        options={segwayLocations}
        fullWidth
        getOptionLabel={(option) => option}
        value={filterLocation.value}
        onChange={filterLocation.changeCallback}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Filter by Location"
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          mask="____.__.__"
          clearable
          startText="Pickup Date"
          endText="Drop off Date"
          value={filterDates.value}
          disablePast
          inputFormat="yyyy.MM.dd"
          onChange={filterDates.changeCallback}
          renderInput={(startProps, endProps) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <TextField {...endProps} />
            </Box>
          )}
        />
      </LocalizationProvider>
      {authUserRole === UserRoles.admin && (
        <Fab
          sx={{
            ml: '1em',
          }}
          size="small"
          onClick={createSegwayCallback}
        >
          <MuiFaIcon icon={faPlus} />
        </Fab>
      )}
    </Box>
  );
};

export const SegwaysControlsBoxRaw = SegwaysControlsBox;
export const SegwaysControlsBoxMemo = React.memo(SegwaysControlsBoxRaw);
export default SegwaysControlsBoxMemo;
