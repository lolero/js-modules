import { createReducerHooks } from 'normalized-reducers-utils';
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
