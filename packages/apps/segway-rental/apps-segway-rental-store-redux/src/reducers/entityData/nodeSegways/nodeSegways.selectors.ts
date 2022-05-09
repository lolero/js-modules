import { createReducerSelectors } from 'normalized-reducers-utils';
import { createSelector } from 'reselect';
import { entries, isEmpty, mean, round, values } from 'lodash';
import {
  NodeSegway,
  NodeSegwayDisplay,
  NodeSegwaysReducer,
} from './nodeSegways.types';
import { ReduxState } from '../../reducers.types';
import nodeSegwaysReducerPath from './nodeSegways.reducerPath';

export const nodeSegwaysSelectors = createReducerSelectors<
  NodeSegwaysReducer['metadata'],
  NodeSegway,
  typeof nodeSegwaysReducerPath,
  ReduxState
>(nodeSegwaysReducerPath);

export const {
  selectRequests: selectNodeSegwaysRequests,
  selectMetadata: selectNodeSegwaysMetadata,
  selectData: selectNodeSegwaysData,
  selectConfig: selectNodeSegwaysConfig,
} = nodeSegwaysSelectors;

export const selectNodeSegwaysModels = createSelector(
  selectNodeSegwaysData,
  (nodeSegways) =>
    values(nodeSegways)
      .map((nodeSegway) => nodeSegway.model)
      .sort(),
) as (state: ReduxState) => string[];

export const selectNodeSegwaysColors = createSelector(
  selectNodeSegwaysData,
  (nodeSegways) =>
    values(nodeSegways)
      .map((nodeSegway) => nodeSegway.color)
      .sort(),
) as (state: ReduxState) => string[];

export const selectNodeSegwaysLocations = createSelector(
  selectNodeSegwaysData,
  (nodeSegways) =>
    values(nodeSegways)
      .map((nodeSegway) => nodeSegway.location)
      .sort(),
) as (state: ReduxState) => string[];

const selectNodeReservations = createSelector(
  (reduxState: ReduxState) =>
    reduxState.entityData.nodeReservationsReducer.data,
  (nodeReservations) => nodeReservations,
);

export const selectNodeSegwaysDisplay = createSelector(
  selectNodeSegwaysData,
  selectNodeReservations,
  (nodeSegways, nodeReservations) => {
    const displaySegways: NodeSegwayDisplay[] = entries(nodeSegways).map(
      ([nodeSegwayPk, nodeSegway]) => {
        const segwayRatings = values(nodeReservations)
          .filter(
            (nodeReservation) =>
              nodeReservation.rating !== null &&
              nodeReservation.__edges__.segway[0] === nodeSegwayPk,
          )
          .map((nodeReservation) => nodeReservation.rating);

        return {
          pk: nodeSegwayPk,
          isAvailable: null,
          model: nodeSegway.model,
          color: nodeSegway.color,
          location: nodeSegway.location,
          rating: isEmpty(segwayRatings) ? null : round(mean(segwayRatings)),
          reservedDays: nodeSegway.reservedDays,
        };
      },
    );

    return displaySegways;
  },
) as (state: ReduxState) => NodeSegwayDisplay[];
