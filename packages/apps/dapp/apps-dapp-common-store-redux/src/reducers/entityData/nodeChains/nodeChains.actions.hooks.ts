import { useDispatch } from 'react-redux';
import type {
  Request,
  UseRequestEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createNodeChainsGetManyRequestAction,
  NODE_CHAINS__GET_MANY__REQUEST_ID,
} from './nodeChains.actions.creators';
import type { NodeChainsGetManyRequestAction } from './nodeChains.actions.types';
import {
  useNodeChainsEntities,
  useNodeChainsReducerMetadata,
  useNodeChainsRequest,
} from './nodeChains.hooks';
import type { NodeChain, NodeChainsReducer } from './nodeChains.types';

export function useNodeChainsGetMany(): UseRequestEntities<
  NodeChainsGetManyRequestAction['requestMetadata'],
  NodeChainsReducer['metadata'],
  NodeChain,
  () => void
> {
  const dispatch = useDispatch();
  const request = useNodeChainsRequest(
    NODE_CHAINS__GET_MANY__REQUEST_ID,
  ) as Request<NodeChainsGetManyRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeChainsReducerMetadata();
  const entityPks = request?.entityPks;
  const entities = useNodeChainsEntities(entityPks ?? []);

  function callback(): void {
    const action = createNodeChainsGetManyRequestAction();
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}
