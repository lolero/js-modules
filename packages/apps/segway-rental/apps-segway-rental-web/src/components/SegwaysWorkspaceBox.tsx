import React, { useCallback, useMemo, useState } from 'react';
import { NodeSegway } from '@js-modules/apps-segway-rental-store-redux';
import { Table, TableContainer } from '@mui/material';
import Box from '@mui/material/Box';
import { DateRange } from '@mui/lab/DateRangePicker';
import { useTableUtils } from '@js-modules/web-react-hooks';
import MainTableHead from './MainTableHead';
import SegwaysTableBody from './SegwaysTableBody';
import SegwaysContext from './SegwaysContext';
import SegwaysControlsBox from './SegwaysControlsBox';

const SegwaysWorkspaceBox: React.FunctionComponent = () => {
  const { tableMetadata, onSortCallback } =
    useTableUtils<keyof NodeSegway>('model');

  const [filterDates, setFilterDates] = useState<
    [string | null, string | null]
  >([null, null]);
  const [filterModel, setFilterModel] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);

  const changeFilterDatesCallback = useCallback(
    (dates: DateRange<string>) => setFilterDates(dates),
    [],
  );

  const changeFilterModelCallback = useCallback(
    (e: React.SyntheticEvent<Element, Event>, selectedModel: string | null) =>
      setFilterModel(selectedModel),
    [],
  );

  const changeFilterColorCallback = useCallback(
    (e: React.SyntheticEvent<Element, Event>, selectedColor: string | null) =>
      setFilterColor(selectedColor),
    [],
  );

  const changeFilterLocationCallback = useCallback(
    (
      e: React.SyntheticEvent<Element, Event>,
      selectedLocation: string | null,
    ) => setFilterLocation(selectedLocation),
    [],
  );

  const segwayContextValue = useMemo(
    () => ({
      filterDates: {
        value: filterDates,
        changeCallback: changeFilterDatesCallback,
      },
      filterModel: {
        value: filterModel,
        changeCallback: changeFilterModelCallback,
      },
      filterColor: {
        value: filterColor,
        changeCallback: changeFilterColorCallback,
      },
      filterLocation: {
        value: filterLocation,
        changeCallback: changeFilterLocationCallback,
      },
    }),
    [
      changeFilterColorCallback,
      changeFilterDatesCallback,
      changeFilterLocationCallback,
      changeFilterModelCallback,
      filterColor,
      filterDates,
      filterLocation,
      filterModel,
    ],
  );

  return (
    <SegwaysContext.Provider value={segwayContextValue}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <SegwaysControlsBox />
        <Box
          sx={{
            height: 'calc(100% - 3em)',
          }}
        >
          <TableContainer
            sx={{
              height: '100%',
            }}
          >
            <Table stickyHeader>
              <MainTableHead
                tableHeaders={{
                  isAvailable: 'Available',
                  model: 'Model',
                  color: 'Color',
                  location: 'Location',
                  rating: 'Rating',
                }}
                sortDirection={tableMetadata.sortDirection}
                sortBy={tableMetadata.sortBy}
                onSort={onSortCallback}
              />
              <SegwaysTableBody
                sortDirection={tableMetadata.sortDirection}
                sortBy={tableMetadata.sortBy}
              />
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SegwaysContext.Provider>
  );
};

export const SegwaysWorkspaceBoxRaw = SegwaysWorkspaceBox;
export const SegwaysWorkspaceBoxMemo = React.memo(SegwaysWorkspaceBoxRaw);
export default SegwaysWorkspaceBoxMemo;
