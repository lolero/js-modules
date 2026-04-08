import { pick } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { ReducerHooks } from '../types/hooks.types';
import type {
  Entity,
  ReducerGroup,
  ReducerMetadata,
} from '../types/reducers.types';
import type { ReducerSelectors } from '../types/selectors.types';

/**
 * Creates React hooks to retrieve a reducer's props, as well as individual
 * requests & entities.
 * @param reducerSelectors - Selectors object for the reducer's props.
 * @returns Hooks for the reducer's props plus individual requests & entities.
 */
export function createReducerHooks<
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  ReducerPathT extends string[],
  ReduxState extends ReducerGroup<ReducerMetadataT, EntityT, ReducerPathT>,
>(
  reducerSelectors: ReducerSelectors<
    ReducerMetadataT,
    EntityT,
    ReducerPathT,
    ReduxState
  >,
): ReducerHooks<ReducerMetadataT, EntityT> {
  const { selectRequests, selectMetadata, selectData, selectConfig } =
    reducerSelectors;

  /**
   * Retrieves an individual request from the reducer's requests.
   * @param requestId - Request ID.
   * @returns Request.
   */
  function useRequest(requestId: string) {
    const reducerRequests = useSelector(selectRequests);

    const request = useMemo(
      () => reducerRequests[requestId],
      [reducerRequests, requestId],
    );

    return request;
  }

  /**
   * Retrieves multiple requests from the reducer's requests.
   * @param requestIds - Request IDs. 'undefined' to retrieve all requests.
   * @returns Requests.
   */
  function useRequests(requestIds?: string[]) {
    const reducerRequests = useSelector(selectRequests);

    const requests = useMemo(() => {
      if (!requestIds) {
        return reducerRequests;
      }

      return pick(reducerRequests, requestIds);
    }, [reducerRequests, requestIds]);

    return requests;
  }

  /**
   * Retrieves a reducer's metadata.
   * @returns Reducer's metadata.
   */
  function useReducerMetadata() {
    const reducerMetadata = useSelector(selectMetadata);

    return reducerMetadata;
  }

  /**
   * Retrieves an individual entity from the reducer's data.
   * @param entityPk - Entity PK.
   * @returns Entity.
   */
  function useEntity(entityPk: string) {
    const reducerData = useSelector(selectData);

    const entity = useMemo(
      () => reducerData[entityPk],
      [entityPk, reducerData],
    );

    return entity;
  }

  /**
   * Retrieves multiple entities from the reducer's data.
   * @param entityPks - Entity PKs. 'undefined' to retrieve all entities.
   * @returns Entities.
   */
  function useEntities(entityPks?: string[]) {
    const reducerData = useSelector(selectData);

    const entities = useMemo(() => {
      if (!entityPks) {
        return reducerData;
      }

      return pick(reducerData, entityPks);
    }, [entityPks, reducerData]);

    return entities;
  }

  /**
   * Retrieves a reducer's config.
   * @returns Reducer's config.
   */
  function useReducerConfig() {
    const reducerConfig = useSelector(selectConfig);

    return reducerConfig;
  }

  return {
    useRequest,
    useRequests,
    useReducerMetadata,
    useEntity,
    useEntities,
    useReducerConfig,
  };
}
