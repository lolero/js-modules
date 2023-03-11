import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { nodeReservationsSelectors } from './nodeReservations.selectors';

export const nodeReservationsHooks = createReducerHooks(
  nodeReservationsSelectors,
);

export const {
  useRequest: useNodeReservationsRequest,
  useRequests: useNodeReservationsRequests,
  useReducerMetadata: useNodeReservationsReducerMetadata,
  useEntity: useNodeReservationsEntity,
  useEntities: useNodeReservationsEntities,
  useReducerConfig: useNodeReservationsReducerConfig,
} = nodeReservationsHooks;
