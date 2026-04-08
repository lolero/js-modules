import { describe, expect, it } from '@jest/globals';
import { testSaga } from 'redux-saga-test-plan';
import type { RequestAction } from '../types/actions.types';
import type { RequestMetadata } from '../types/reducers.types';
import {
  doesActionMatchRequest,
  getRequestActionTypePrefix,
  mySaga,
  wasRequestSuccessful,
} from './actions.utils';

describe('action.utils', () => {
  const requestAction: RequestAction<string, RequestMetadata> = {
    type: 'testRequestAction__REQUEST',
    requestMetadata: {},
    requestId: 'testRequestActionRequestId',
  };

  describe('getRequestActionTypePrefix', () => {
    it('Should get request action type prefix', () => {
      const requestActionTypePrefix = getRequestActionTypePrefix(requestAction);

      expect(requestActionTypePrefix).toBe('testRequestAction');
    });
  });

  describe('doesActionMatchRequest', () => {
    it('Should match request for success action', () => {
      const action: RequestAction<string, RequestMetadata> = {
        type: `${getRequestActionTypePrefix(requestAction)}__SUCCESS`,
        requestMetadata: {},
        requestId: requestAction.requestId,
      };

      expect(doesActionMatchRequest(requestAction, action)).toBe(true);
    });

    it('Should match request for fail action', () => {
      const action: RequestAction<string, RequestMetadata> = {
        type: `${getRequestActionTypePrefix(requestAction)}__FAIL`,
        requestMetadata: {},
        requestId: requestAction.requestId,
      };

      expect(doesActionMatchRequest(requestAction, action)).toBe(true);
    });

    it('Should not match request if request ids are different', () => {
      const action: RequestAction<string, RequestMetadata> = {
        type: `${getRequestActionTypePrefix(requestAction)}__SUCCESS`,
        requestMetadata: {},
        requestId: 'randomRequestId',
      };

      expect(doesActionMatchRequest(requestAction, action)).toBe(false);
    });

    it('Should not match request if request type prefixes are different', () => {
      const action: RequestAction<string, RequestMetadata> = {
        type: 'randomPrefix__SUCCESS',
        requestMetadata: {},
        requestId: requestAction.requestId,
      };

      expect(doesActionMatchRequest(requestAction, action)).toBe(false);
    });
  });

  describe('wasRequestSuccessful', () => {
    it.skip('Should return true for corresponding success action', () => {
      testSaga(wasRequestSuccessful, requestAction)
        .next()
        .call(getRequestActionTypePrefix, requestAction)
        .next(getRequestActionTypePrefix(requestAction))
        .take()
        .next({ type: 'testRequestAction__SUCCESS' })
        .returns(true)
        .finish();
    });

    it.skip('Should return false for corresponding fail action', () => {
      testSaga(wasRequestSuccessful, requestAction)
        .next()
        .call(getRequestActionTypePrefix, requestAction)
        .next(getRequestActionTypePrefix(requestAction))
        .take()
        .next({ type: 'testRequestAction__FAIL' })
        .returns(true)
        .finish();
    });

    it.skip('Should test mySaga', () => {
      testSaga(mySaga, { type: 'myActionType' }).next().take().next().finish();
    });
  });
});
