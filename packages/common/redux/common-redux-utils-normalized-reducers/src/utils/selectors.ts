import type { Entity, Reducer, ReducerMetadata } from '../types/reducers.types';

/**
 * Selects reducer prop.
 * @param reducer - Path to reducer in redux state.
 * @param reducerPropKey - Reducer prop key.
 * @returns Reducer prop.
 */
export function selectReducerProp<
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  ReducerPropKey extends keyof Reducer<ReducerMetadataT, EntityT>,
>(
  reducer: Reducer<ReducerMetadataT, EntityT>,
  reducerPropKey: ReducerPropKey,
): Reducer<ReducerMetadataT, EntityT>[ReducerPropKey] {
  return reducer[reducerPropKey];
}
