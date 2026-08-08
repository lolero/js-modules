import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest as jestGlobals,
} from '@jest/globals';
import pick from 'lodash/pick';
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
  Request,
  RequestMetadata,
} from '../types/reducers.types';
import { createInitialState, defaultReducerConfig } from './initialState.utils';
import {
  handleClearReducerRequests,
  handleDeleteEntities,
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSavePartialEntities,
  handleSavePartialPatternToEntities,
  handleSavePartialReducerMetadata,
  handleSaveWholeEntities,
  handleSaveWholeReducerMetadata,
} from './reducerHandlers';
import {
  duplicateState,
  handleCommonProps,
  updateCompletedRequestsCache,
} from './reducerHandlers.utils';
import type {
  TestEntity,
  TestReducer,
  TestRequestMetadata,
} from './spec.utils';
import {
  getPkOfTestEntity,
  testEntity1,
  testEntity2,
  testEntity3,
  testInitialReducerMetadata,
} from './spec.utils';

jest.mock('./reducerHandlers.utils');

describe('reducerHandlers', () => {
  let state: TestReducer;
  let duplicatedState: TestReducer;

  beforeEach(() => {
    state = createInitialState<TestReducer['metadata'], TestEntity>(
      testInitialReducerMetadata,
      {},
    );
    duplicatedState = createInitialState<TestReducer['metadata'], TestEntity>(
      testInitialReducerMetadata,
      {},
    );
    jestGlobals
      .mocked<
        (
          state: Reducer<ReducerMetadata, Entity>,
          action: never,
        ) => Reducer<ReducerMetadata, Entity>
      >(duplicateState)
      .mockImplementation(() => duplicatedState);
  });

  afterEach(() => {
    jestGlobals.resetAllMocks();
  });

  describe('handleClearReducerRequests', () => {
    it('Should handle clear reducer requests', () => {
      duplicatedState = {
        ...duplicatedState,
        requests: {
          request_id_1: {} as Request<RequestMetadata>,
          request_id_2: {} as Request<RequestMetadata>,
          request_id_3: {} as Request<RequestMetadata>,
        },
      };

      const testClearReducerRequestsAction: ClearReducerRequestsAction<'testClearReducerRequestsAction'> =
        {
          type: 'testClearReducerRequestsAction',
          requestIds: ['request_id_1', 'request_id_2'],
        };

      const stateNew = handleClearReducerRequests(
        state,
        testClearReducerRequestsAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testClearReducerRequestsAction,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        requests: pick(duplicatedState.requests, 'request_id_3'),
      });
    });
  });

  describe('handleRequest', () => {
    let testRequestAction: RequestAction<
      'testRequestAction',
      TestRequestMetadata
    >;

    beforeEach(() => {
      testRequestAction = {
        type: 'testRequestAction',
        requestMetadata: {
          testRequestMetadata: 'testRequestMetadata',
        },
        requestId: 'testRequestActionRequestId',
      };
    });

    it('Should handle request', () => {
      const stateNew = handleRequest(state, testRequestAction);

      expect(duplicateState).toHaveBeenCalledWith(state, testRequestAction);
      expect(stateNew).toEqual({
        ...duplicatedState,
        requests: {
          [testRequestAction.requestId]: {
            id: testRequestAction.requestId,
            createdAt: {
              unixMilliseconds: expect.any(Number),
            },
            isPending: true,
            metadata: testRequestAction.requestMetadata,
          },
        },
      });
    });

    describe('state.config.requestsPrettyTimestamps', () => {
      it("Should format string of request's timestamps to ISO string with UTC timezone", () => {
        state.config = {
          ...defaultReducerConfig,
          requestsPrettyTimestamps: {
            format: 'utc',
            timezone: 'utc',
          },
        };

        const stateNew = handleRequest(state, testRequestAction);

        const requestCreatedAt =
          stateNew.requests[testRequestAction.requestId].createdAt;
        const createdDate = new Date(requestCreatedAt.unixMilliseconds);
        expect(requestCreatedAt.formattedString).toBe(
          createdDate.toISOString(),
        );
      });
    });
  });

  describe('handleSaveNothing', () => {
    it('Should handle save partial reducer metadata', () => {
      const testSaveNothingAction: SaveNothingAction<'testSaveNothingAction'> =
        {
          type: 'testSaveNothingAction',
        };

      handleSaveNothing(state, testSaveNothingAction);

      expect(duplicateState).toHaveBeenCalledWith(state, testSaveNothingAction);
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSaveNothingAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
    });
  });

  describe('handleSaveWholeReducerMetadata', () => {
    it('Should handle save partial reducer metadata', () => {
      duplicatedState.metadata = {
        reducerStatus: 'unchanged',
        entityCount: 0,
      };

      const testSaveWholeReducerMetadataAction: SaveWholeReducerMetadataAction<
        'testSaveWholeReducerMetadataAction',
        TestReducer['metadata']
      > = {
        type: 'testSaveWholeReducerMetadataAction',
        wholeReducerMetadata: {
          reducerStatus: 'changed',
          entityCount: 1,
        },
      };

      const stateNew = handleSaveWholeReducerMetadata(
        state,
        testSaveWholeReducerMetadataAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSaveWholeReducerMetadataAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSaveWholeReducerMetadataAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        metadata: testSaveWholeReducerMetadataAction.wholeReducerMetadata,
      });
    });
  });

  describe('handleSavePartialReducerMetadata', () => {
    it('Should handle save partial reducer metadata', () => {
      const testSavePartialReducerMetadataAction: SavePartialReducerMetadataAction<
        'testSavePartialReducerMetadataAction',
        TestReducer['metadata']
      > = {
        type: 'testSavePartialReducerMetadataAction',
        partialReducerMetadata: {},
      };

      handleSavePartialReducerMetadata(
        state,
        testSavePartialReducerMetadataAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSavePartialReducerMetadataAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSavePartialReducerMetadataAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
    });
  });

  describe('handleSaveWholeEntities', () => {
    it('Should handle save whole entities without flushing reducer', () => {
      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
      };
      const testSaveWholeEntitiesAction: SaveWholeEntitiesAction<
        'testSaveWholeEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSaveWholeEntitiesAction',
        wholeEntities: {
          [getPkOfTestEntity(testEntity2)]: testEntity2,
          [getPkOfTestEntity(testEntity3)]: testEntity3,
        },
      };

      const stateNew = handleSaveWholeEntities(
        state,
        testSaveWholeEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSaveWholeEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSaveWholeEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...duplicatedState.data,
          ...testSaveWholeEntitiesAction.wholeEntities,
        },
      });
    });

    it('Should handle save whole entities with flushing reducer', () => {
      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
      };
      const testSaveWholeEntitiesAction: SaveWholeEntitiesAction<
        'testSaveWholeEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSaveWholeEntitiesAction',
        wholeEntities: {
          [getPkOfTestEntity(testEntity2)]: testEntity2,
          [getPkOfTestEntity(testEntity3)]: testEntity3,
        },
        flush: true,
      };

      const stateNew = handleSaveWholeEntities(
        state,
        testSaveWholeEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSaveWholeEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSaveWholeEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...testSaveWholeEntitiesAction.wholeEntities,
        },
      });
    });
  });

  describe('handleSavePartialEntities', () => {
    it('Should handle save partial entities', () => {
      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
        [getPkOfTestEntity(testEntity2)]: testEntity2,
      };
      const testSavePartialEntitiesAction: SavePartialEntitiesAction<
        'testSavePartialEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSavePartialEntitiesAction',
        partialEntities: {
          [getPkOfTestEntity(testEntity1)]: {
            name: 'newTestName1',
            isTrue: false,
            __edges__: {
              parent: ['newTestParent'],
              children: ['testEntityId2', 'testEntityId3', 'newTestChild'],
            },
          },
          [getPkOfTestEntity(testEntity2)]: {
            name: 'newTestName2',
            __edges__: {
              children: ['newTestChild'],
            },
          },
        },
      };

      const stateNew = handleSavePartialEntities(
        state,
        testSavePartialEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSavePartialEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSavePartialEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...duplicatedState.data,
          [getPkOfTestEntity(testEntity1)]: {
            ...testEntity1,
            ...testSavePartialEntitiesAction.partialEntities[
              getPkOfTestEntity(testEntity1)
            ],
            __edges__: {
              ...testEntity1.__edges__,
              ...testSavePartialEntitiesAction.partialEntities[
                getPkOfTestEntity(testEntity1)
              ].__edges__,
            },
          },
          [getPkOfTestEntity(testEntity2)]: {
            ...testEntity2,
            ...testSavePartialEntitiesAction.partialEntities[
              getPkOfTestEntity(testEntity2)
            ],
            __edges__: {
              ...testEntity2.__edges__,
              ...testSavePartialEntitiesAction.partialEntities[
                getPkOfTestEntity(testEntity2)
              ].__edges__,
            },
          },
        },
      });
    });

    it('Should log warning to the console when attempting to save partial entity that does not exist', () => {
      const consoleWarnSpy = jestGlobals
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
      };
      const testSavePartialEntitiesAction: SavePartialEntitiesAction<
        'testSavePartialEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSavePartialEntitiesAction',
        partialEntities: {
          [getPkOfTestEntity(testEntity1)]: {
            name: 'newTestName1',
          },
          nonExistingPk: {
            name: 'newNonExistingName',
          },
        },
      };

      const stateNew = handleSavePartialEntities(
        state,
        testSavePartialEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSavePartialEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSavePartialEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Failed to save partial entity with PK 'nonExistingPk'`,
        testSavePartialEntitiesAction,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...duplicatedState.data,
          [getPkOfTestEntity(testEntity1)]: {
            ...testEntity1,
            ...testSavePartialEntitiesAction.partialEntities[
              getPkOfTestEntity(testEntity1)
            ],
            __edges__: {
              ...testEntity1.__edges__,
              ...testSavePartialEntitiesAction.partialEntities[
                getPkOfTestEntity(testEntity1)
              ].__edges__,
            },
          },
        },
      });

      consoleWarnSpy.mockRestore();
    });
  });

  describe('handleSavePartialPatternToEntities', () => {
    it('Should handle save partial pattern to entities', () => {
      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
        [getPkOfTestEntity(testEntity2)]: testEntity2,
        [getPkOfTestEntity(testEntity3)]: testEntity3,
      };
      const testSavePartialPatternToEntitiesAction: SavePartialPatternToEntitiesAction<
        'testSavePartialPatternToEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSavePartialPatternToEntitiesAction',
        entityPks: [
          getPkOfTestEntity(testEntity1),
          getPkOfTestEntity(testEntity2),
          getPkOfTestEntity(testEntity3),
        ],
        partialEntity: {
          isTrue: true,
          number: 10,
          __edges__: {
            emergencyContacts: [
              'testEmergencyContact1',
              'testEmergencyContact2',
            ],
          },
        },
      };

      const stateNew = handleSavePartialPatternToEntities(
        state,
        testSavePartialPatternToEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSavePartialPatternToEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSavePartialPatternToEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...duplicatedState.data,
          [getPkOfTestEntity(testEntity1)]: {
            ...testEntity1,
            ...testSavePartialPatternToEntitiesAction.partialEntity,
            __edges__: {
              ...testEntity1.__edges__,
              ...testSavePartialPatternToEntitiesAction.partialEntity.__edges__,
            },
          },
          [getPkOfTestEntity(testEntity2)]: {
            ...testEntity2,
            ...testSavePartialPatternToEntitiesAction.partialEntity,
            __edges__: {
              ...testEntity2.__edges__,
              ...testSavePartialPatternToEntitiesAction.partialEntity.__edges__,
            },
          },
          [getPkOfTestEntity(testEntity3)]: {
            ...testEntity3,
            ...testSavePartialPatternToEntitiesAction.partialEntity,
            __edges__: {
              ...testEntity3.__edges__,
              ...testSavePartialPatternToEntitiesAction.partialEntity.__edges__,
            },
          },
        },
      });
    });

    it('Should log warning to the console when attempting to save partial pattern to entity that does not exist', () => {
      const consoleWarnSpy = jestGlobals
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
      };
      const testSavePartialPatternToEntitiesAction: SavePartialPatternToEntitiesAction<
        'testSavePartialPatternToEntitiesAction',
        never,
        TestEntity
      > = {
        type: 'testSavePartialPatternToEntitiesAction',
        entityPks: [getPkOfTestEntity(testEntity1), 'nonExistingPk'],
        partialEntity: {
          isTrue: true,
          number: 10,
          __edges__: {
            emergencyContacts: [
              'testEmergencyContact1',
              'testEmergencyContact2',
            ],
          },
        },
      };

      const stateNew = handleSavePartialPatternToEntities(
        state,
        testSavePartialPatternToEntitiesAction,
      );

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testSavePartialPatternToEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testSavePartialPatternToEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Failed to save partial pattern to entity with PK 'nonExistingPk'`,
        testSavePartialPatternToEntitiesAction,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          ...duplicatedState.data,
          [getPkOfTestEntity(testEntity1)]: {
            ...testEntity1,
            ...testSavePartialPatternToEntitiesAction.partialEntity,
            __edges__: {
              ...testEntity1.__edges__,
              ...testSavePartialPatternToEntitiesAction.partialEntity.__edges__,
            },
          },
        },
      });

      consoleWarnSpy.mockRestore();
    });
  });

  describe('handleDeleteEntities', () => {
    it('Should handle delete entities', () => {
      duplicatedState.data = {
        [getPkOfTestEntity(testEntity1)]: testEntity1,
        [getPkOfTestEntity(testEntity2)]: testEntity2,
        [getPkOfTestEntity(testEntity3)]: testEntity3,
      };
      const testDeleteEntitiesAction: DeleteEntitiesAction<
        'testDeleteEntitiesAction',
        never
      > = {
        type: 'testDeleteEntitiesAction',
        entityPks: [
          getPkOfTestEntity(testEntity1),
          getPkOfTestEntity(testEntity3),
        ],
      };

      const stateNew = handleDeleteEntities(state, testDeleteEntitiesAction);

      expect(duplicateState).toHaveBeenCalledWith(
        state,
        testDeleteEntitiesAction,
      );
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testDeleteEntitiesAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
      expect(stateNew).toEqual({
        ...duplicatedState,
        data: {
          [getPkOfTestEntity(testEntity2)]: testEntity2,
        },
      });
    });
  });

  describe('handleFail', () => {
    it('Should handle fail', () => {
      const testFailAction: FailAction<'testFailAction'> = {
        type: 'testFailAction',
        error: 'testRequestActionRequestId',
        requestId: 'testRequestId',
      };

      handleFail(state, testFailAction);

      expect(duplicateState).toHaveBeenCalledWith(state, testFailAction);
      expect(handleCommonProps).toHaveBeenCalledWith(
        duplicatedState,
        testFailAction,
      );
      expect(updateCompletedRequestsCache).toHaveBeenCalledWith(
        duplicatedState,
      );
    });
  });
});
