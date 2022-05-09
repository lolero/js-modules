import {
  handleDeleteEntities,
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSaveWholeEntities,
} from 'normalized-reducers-utils';
import { NodeReservationsReducer } from './nodeReservations.types';
import { nodeReservationsInitialState } from './nodeReservations.initialState';
import {
  NodeReservationsActionTypes,
  NodeReservationsReducerHittingAction,
} from './nodeReservations.actionsTypes';

function nodeReservationsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeReservationsReducer = nodeReservationsInitialState,
  action: NodeReservationsReducerHittingAction,
): NodeReservationsReducer {
  switch (action.type) {
    case NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__SUCCESS:
      return handleSaveNothing(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__FAIL:
      return handleFail(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST:
      return handleRequest(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__SUCCESS:
      return handleSaveNothing(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__FAIL:
      return handleFail(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default nodeReservationsReducer;
