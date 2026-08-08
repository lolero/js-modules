import { pick } from 'lodash';
import { useSelector } from 'react-redux';
import type { ReducerHooks } from '../types/hooks.types';
import type {
  Entity,
  ReducerConfig,
  ReducerData,
  ReducerGroup,
  ReducerMetadata,
  Request,
  RequestMetadata,
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
  function useRequest(requestId: string): Request<RequestMetadata> {
    const reducerRequests = useSelector(selectRequests);

    const request = reducerRequests[requestId];

    return request;
  }

  /**
   * Retrieves multiple requests from the reducer's requests.
   * @param requestIds - Request IDs. 'undefined' to retrieve all requests.
   * @returns Requests.
   */
  function useRequests(
    requestIds?: string[],
  ): Record<string, Request<RequestMetadata>> {
    const reducerRequests = useSelector(selectRequests);

    const requests = requestIds
      ? pick(reducerRequests, requestIds)
      : reducerRequests;

    return requests;
  }

  /**
   * Retrieves a reducer's metadata.
   * @returns Reducer's metadata.
   */
  function useReducerMetadata(): ReducerMetadataT {
    const reducerMetadata = useSelector(selectMetadata);

    return reducerMetadata;
  }

  /**
   * Retrieves an individual entity from the reducer's data.
   * @param entityPk - Entity PK.
   * @returns Entity.
   */
  function useEntity(entityPk: string): EntityT {
    const reducerData = useSelector(selectData);

    const entity = reducerData[entityPk];

    return entity;
  }

  /**
   * Retrieves multiple entities from the reducer's data.
   * @param entityPks - Entity PKs. 'undefined' to retrieve all entities.
   * @returns Entities.
   */
  function useEntities(entityPks?: string[]): ReducerData<EntityT> {
    const reducerData = useSelector(selectData);

    const entities = entityPks ? pick(reducerData, entityPks) : reducerData;

    return entities;
  }

  /**
   * Retrieves a reducer's config.
   * @returns Reducer's config.
   */
  function useReducerConfig(): ReducerConfig {
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
