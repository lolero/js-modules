import { createReducerSelectors } from 'normalized-reducers-utils';
import { createSelector } from 'reselect';
import { entries } from 'lodash';
import {
  NodeReservation,
  NodeReservationDisplay,
  NodeReservationsReducer,
} from './nodeReservations.types';
import { ReduxState } from '../../reducers.types';
import nodeReservationsReducerPath from './nodeReservations.reducerPath';
import { selectNodeSegwaysData } from '../nodeSegways/nodeSegways.selectors';
import { selectNodeUsersData } from '../nodeUsers/nodeUsers.selectors';
import { selectStateAuthMetadata } from '../../appState/stateAuth/stateAuth.selectors';
import { UserRoles } from '../../appState/stateAuth/stateAuth.types';

export const nodeReservationsSelectors = createReducerSelectors<
  NodeReservationsReducer['metadata'],
  NodeReservation,
  typeof nodeReservationsReducerPath,
  ReduxState
>(nodeReservationsReducerPath);

export const {
  selectRequests: selectNodeReservationsRequests,
  selectMetadata: selectNodeReservationsMetadata,
  selectData: selectNodeReservationsData,
  selectConfig: selectNodeReservationsConfig,
} = nodeReservationsSelectors;

export const selectNodeReservationsDisplay = createSelector(
  selectStateAuthMetadata,
  selectNodeSegwaysData,
  selectNodeReservationsData,
  selectNodeUsersData,
  (stateAuthMetadata, nodeSegways, nodeReservations, nodeUsers) => {
    const { authUser, authUserRole } = stateAuthMetadata;

    const displayReservations: NodeReservationDisplay[] = entries(
      nodeReservations,
    )
      .filter(([, nodeReservation]) => {
        if (authUserRole === UserRoles.manager) {
          return true;
        }

        return nodeReservation.__edges__.user[0] === authUser?.uid;
      })
      .map(([nodeReservationPk, nodeReservation]) => {
        const nodeSegwayPk = nodeReservation.__edges__.segway[0];
        const nodeSegway = nodeSegways[nodeSegwayPk];

        const nodeUserPk = nodeReservation.__edges__.user[0];
        const nodeUser = nodeUsers[nodeUserPk];

        return {
          pk: nodeReservationPk,
          model: nodeSegway.model,
          color: nodeSegway.color,
          location: nodeSegway.location,
          fromTimestamp: nodeReservation.fromTimestamp,
          toTimestamp: nodeReservation.toTimestamp,
          rating: nodeReservation.rating,
          reservedBy: nodeUser.displayName,
        };
      });

    return displayReservations;
  },
) as (state: ReduxState) => NodeReservationDisplay[];
