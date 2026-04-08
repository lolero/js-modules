import type { SagaGenerator } from 'typed-redux-saga';
import { call, take } from 'typed-redux-saga';
import type { RequestAction } from '../types/actions.types';
import type { RequestMetadata } from '../types/reducers.types';

/**
 * Get request action type prefix.
 * @param requestAction - Request action.
 * @returns Request action type prefix.
 */
export function getRequestActionTypePrefix(
  requestAction: RequestAction<string, RequestMetadata>,
): string {
  return requestAction.type.split('__REQUEST')[0];
}

/**
 * Checks if success/fail action's type prefix and request ID match request
 * action.
 * @param requestAction - Request action.
 * @param action - Action.
 * @returns Whether or not action matches request action.
 */
export function doesActionMatchRequest(
  requestAction: RequestAction<string, RequestMetadata>,
  action: RequestAction<string, RequestMetadata>,
): boolean {
  const requestActionTypePrefix = getRequestActionTypePrefix(requestAction);
  return (
    action.requestId === requestAction.requestId &&
    (action.type === `${requestActionTypePrefix}__SUCCESS` ||
      action.type === `${requestActionTypePrefix}__FAIL`)
  );
}

/**
 * Waits for success or fail action to be dispatched, corresponding to a
 * request action, and returns whether or not the request was successful.
 * @param requestAction - Request action.
 * @returns Whether or not request action was successful.
 */
export function* wasRequestSuccessful(
  requestAction: RequestAction<string, RequestMetadata>,
): SagaGenerator<boolean> {
  const requestActionTypePrefix = yield* call(
    getRequestActionTypePrefix,
    requestAction,
  );
  const { type: resultActionType } = yield* take(
    (action: { type: string }) =>
      'requestId' in action &&
      doesActionMatchRequest(
        requestAction,
        action as unknown as RequestAction<string, RequestMetadata>,
      ),
  );
  return resultActionType === `${requestActionTypePrefix}__SUCCESS`;
}

/**
 * Test function.
 * @param myAction - Test action.
 * @param myAction.type - The action type to match against.
 * @returns My saga result.
 */
export function* mySaga(myAction: { type: string }): SagaGenerator<boolean> {
  const { type: actionType } = yield* take(
    (action: { type: string }) => action.type === myAction.type,
  );
  return actionType === myAction.type;
}
