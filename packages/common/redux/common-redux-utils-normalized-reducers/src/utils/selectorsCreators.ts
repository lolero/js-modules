import { last } from 'lodash';
import { createSelector } from 'reselect';
import type {
  Entity,
  Reducer,
  ReducerGroup,
  ReducerMetadata,
} from '../types/reducers.types';
import type { ReducerSelectors } from '../types/selectors.types';
import { selectReducerProp } from './selectors';

/**
 * Creates reducer prop selector.
 * @param reducerPath - Path to reducer in redux state.
 * @param reducerPropKey - Reducer prop key.
 * @returns Reducer prop selector.
 */
export function createReducerPropSelector<
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  ReducerPathT extends string[],
  ReduxState extends ReducerGroup<ReducerMetadataT, EntityT, ReducerPathT>,
  ReducerPropKey extends keyof Reducer<ReducerMetadataT, EntityT>,
>(
  reducerPath: ReducerPathT,
  reducerPropKey: ReducerPropKey,
): (state: ReduxState) => Reducer<ReducerMetadataT, EntityT>[ReducerPropKey] {
  const selector = createSelector(
    [
      (state: ReduxState) => {
        let reducerGroup: ReducerGroup<
          ReducerMetadataT,
          EntityT,
          ReducerPathT
        > = state;
        reducerPath
          .slice(0, reducerPath.length - 1)
          .forEach((reducerGroupName) => {
            reducerGroup = reducerGroup[
              reducerGroupName as keyof typeof reducerGroup
            ] as ReducerGroup<ReducerMetadataT, EntityT, ReducerPathT>;
          });
        const reducer = reducerGroup[
          last(reducerPath) as keyof typeof reducerGroup
        ] as Reducer<ReducerMetadataT, EntityT>;

        return reducer;
      },
    ],
    (reducer) => selectReducerProp(reducer, reducerPropKey),
  ) as unknown as (
    state: ReduxState,
  ) => Reducer<ReducerMetadataT, EntityT>[ReducerPropKey];

  return selector;
}

/**
 * Creates reducer props selectors.
 * @param reducerPath - Path to reducer in redux state.
 * @returns Reducer props selectors.
 */
export function createReducerSelectors<
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  ReducerPathT extends string[],
  ReduxState extends ReducerGroup<ReducerMetadataT, EntityT, ReducerPathT>,
>(
  reducerPath: ReducerPathT,
): ReducerSelectors<ReducerMetadataT, EntityT, ReducerPathT, ReduxState> {
  const reducerSelectors: ReducerSelectors<
    ReducerMetadataT,
    EntityT,
    ReducerPathT,
    ReduxState
  > = {
    selectRequests: createReducerPropSelector<
      ReducerMetadataT,
      EntityT,
      ReducerPathT,
      ReduxState,
      'requests'
    >(reducerPath, 'requests'),
    selectMetadata: createReducerPropSelector<
      ReducerMetadataT,
      EntityT,
      ReducerPathT,
      ReduxState,
      'metadata'
    >(reducerPath, 'metadata'),
    selectData: createReducerPropSelector<
      ReducerMetadataT,
      EntityT,
      ReducerPathT,
      ReduxState,
      'data'
    >(reducerPath, 'data'),
    selectConfig: createReducerPropSelector<
      ReducerMetadataT,
      EntityT,
      ReducerPathT,
      ReduxState,
      'config'
    >(reducerPath, 'config'),
  };

  return reducerSelectors;
}
