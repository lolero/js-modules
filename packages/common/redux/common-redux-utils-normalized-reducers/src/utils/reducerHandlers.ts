import type {
  ClearReducerRequestsAction,
  DeleteEntitiesAction,
  FailAction,
  RequestAction,
  SaveNothingAction,
  SavePartialEntitiesAction,
  SavePartialPatternToEntitiesAction,
  SavePartialReducerMetadataAction,
  SaveWholeEntitiesAction,
  SaveWholeReducerMetadataAction,
} from '../types/actions.types';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
  RequestMetadata,
} from '../types/reducers.types';
import {
  duplicateState,
  handleCommonProps,
  updateCompletedRequestsCache,
} from './reducerHandlers.utils';

/**
 * Clears a set of the reducer's 'requests'.
 * @param state - The current state of the reducer.
 * @param action - Request action.
 * @returns Updated reducer state.
 */
export function handleClearReducerRequests<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: ClearReducerRequestsAction<ActionTypeT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  action.requestIds.forEach((requestId) => {
    delete newState.requests[requestId];
  });

  return newState;
}

/**
 * Calls handleCommonProps and updateCompletedRequestsCache.
 * @param newState - A copy of the redux state.
 * @param action - Success or fail action.
 */
function handleCompletedRequest<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  newState: Reducer<ReducerMetadataT, EntityT>,
  action:
    | SaveNothingAction<ActionTypeT>
    | SaveWholeReducerMetadataAction<ActionTypeT, ReducerMetadataT>
    | SavePartialReducerMetadataAction<ActionTypeT, ReducerMetadataT>
    | SaveWholeEntitiesAction<ActionTypeT, ReducerMetadataT, EntityT>
    | SavePartialEntitiesAction<ActionTypeT, ReducerMetadataT, EntityT>
    | SavePartialPatternToEntitiesAction<ActionTypeT, ReducerMetadataT, EntityT>
    | DeleteEntitiesAction<ActionTypeT, ReducerMetadataT>
    | FailAction<ActionTypeT>,
): void {
  handleCommonProps(newState, action);
  updateCompletedRequestsCache(newState);
}

/**
 * Creates pending request.
 * @param state - The current state of the reducer.
 * @param action - Request action.
 * @returns Updated reducer state.
 */
export function handleRequest<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  RequestMetadataT extends RequestMetadata,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: RequestAction<ActionTypeT, RequestMetadataT>,
): Reducer<ReducerMetadataT, EntityT> {
  const createdDate = new Date();
  const newState = duplicateState(state, action);
  newState.requests[action.requestId] = {
    id: action.requestId,
    createdAt: {
      unixMilliseconds: createdDate.valueOf(),
    },
    isPending: true,
    metadata: action.requestMetadata,
  };

  if (state.config.requestsPrettyTimestamps) {
    newState.requests[action.requestId].createdAt.formattedString =
      createdDate.toISOString();
  }

  return newState;
}

/**
 * Completes request and leaves reducer's 'metadata' and 'data' unchanged.
 * @param state - The current state of the reducer.
 * @param action - Save nothing success action.
 * @returns Updated reducer state.
 */
export function handleSaveNothing<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SaveNothingAction<ActionTypeT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Updates reducer's 'metadata' and completes request.
 * @param state - The current state of the reducer.
 * @param action - Save whole reducer metadata success action.
 * @returns Updated reducer state.
 */
export function handleSaveWholeReducerMetadata<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SaveWholeReducerMetadataAction<ActionTypeT, ReducerMetadataT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  newState.metadata = action.wholeReducerMetadata;
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Partially updates reducer's 'metadata' and completes request.
 * @param state - The current state of the reducer.
 * @param action - Save partial reducer metadata success action.
 * @returns Updated reducer state.
 */
export function handleSavePartialReducerMetadata<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SavePartialReducerMetadataAction<ActionTypeT, ReducerMetadataT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Updates reducer's 'data' whole entities, reducer's 'metadata' and
 * completes request.
 * @param state - The current state of the reducer.
 * @param action - Save whole entities success action.
 * @returns Updated reducer state.
 */
export function handleSaveWholeEntities<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SaveWholeEntitiesAction<ActionTypeT, ReducerMetadataT, EntityT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  newState.data = action.flush
    ? action.wholeEntities
    : { ...newState.data, ...action.wholeEntities };
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Updates reducer's 'data' partial entities (with the entities' '__edges__'
 * also updated partially), reducer's 'metadata' and completes request.
 * @param state - The current state of the reducer.
 * @param action - Save partial entity success action.
 * @returns Updated reducer state.
 */
export function handleSavePartialEntities<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SavePartialEntitiesAction<ActionTypeT, ReducerMetadataT, EntityT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  Object.keys(action.partialEntities).forEach((entityPk) => {
    if (!newState.data[entityPk]) {
      // no-console is disabled because a console warning is deliberately
      // intended when saving a partial entity to a PK that does not exist is
      // attempted
      // eslint-disable-next-line no-console
      console.warn(
        `Failed to save partial entity with PK '${entityPk}'`,
        action,
      );
      return;
    }

    newState.data[entityPk] = {
      ...newState.data[entityPk],
      ...action.partialEntities[entityPk],
      __edges__: newState.data[entityPk].__edges__,
    };
    if (action.partialEntities[entityPk].__edges__) {
      newState.data[entityPk].__edges__ = {
        ...newState.data[entityPk].__edges__,
        ...action.partialEntities[entityPk].__edges__,
      };
    }
  });
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Updates reducer's 'data' partial entities (with the entities' '__edges__'
 * also updated partially) with the same partial entity pattern, reducer's
 * 'metadata' and completes request.
 * @param state - The current state of the reducer.
 * @param action - Save partial entity success action.
 * @returns Updated reducer state.
 */
export function handleSavePartialPatternToEntities<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: SavePartialPatternToEntitiesAction<
    ActionTypeT,
    ReducerMetadataT,
    EntityT
  >,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  action.entityPks.forEach((entityPk) => {
    if (!newState.data[entityPk]) {
      // no-console is disabled because a console warning is deliberately
      // intended when saving a partial entity to a PK that does not exist is
      // attempted
      // eslint-disable-next-line no-console
      console.warn(
        `Failed to save partial pattern to entity with PK '${entityPk}'`,
        action,
      );
      return;
    }

    newState.data[entityPk] = {
      ...newState.data[entityPk],
      ...action.partialEntity,
      __edges__: newState.data[entityPk].__edges__,
    };
    if (action.partialEntity.__edges__) {
      newState.data[entityPk].__edges__ = {
        ...newState.data[entityPk].__edges__,
        ...action.partialEntity.__edges__,
      };
    }
  });
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 * Deletes reducer's 'data' entities, updates reducer's 'metadata' and
 * completes request.
 * @param state - The current state of the reducer.
 * @param action - Delete entities success action.
 * @returns Updated reducer state.
 */
export function handleDeleteEntities<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: DeleteEntitiesAction<ActionTypeT, ReducerMetadataT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  action.entityPks.forEach((entityPk) => delete newState.data[entityPk]);
  handleCompletedRequest(newState, action);

  return newState;
}

/**
 *
 * Updates pending request to reflect that it has failed.
 * @param state - The current state of the reducer.
 * @param action - Fail action.
 * @returns Updated reducer state.
 */
export function handleFail<
  ActionTypeT extends string,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
>(
  state: Reducer<ReducerMetadataT, EntityT>,
  action: FailAction<ActionTypeT>,
): Reducer<ReducerMetadataT, EntityT> {
  const newState = duplicateState(state, action);
  handleCompletedRequest(newState, action);

  return newState;
}
