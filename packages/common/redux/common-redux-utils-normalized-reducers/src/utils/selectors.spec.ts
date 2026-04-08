import { describe, expect, it } from '@jest/globals';
import { createInitialState } from './initialState.utils';
import { selectReducerProp } from './selectors';
import type { TestEntity, TestReducer } from './spec.utils';
import { testInitialReducerMetadata } from './spec.utils';

describe('selectors', () => {
  describe('selectReducerProp', () => {
    it('Should select reducer prop', () => {
      const testInitialState = createInitialState<
        TestReducer['metadata'],
        TestEntity
      >(testInitialReducerMetadata, {});

      const metadata = selectReducerProp(testInitialState, 'metadata');

      expect(metadata).toBe(metadata);
    });
  });
});
