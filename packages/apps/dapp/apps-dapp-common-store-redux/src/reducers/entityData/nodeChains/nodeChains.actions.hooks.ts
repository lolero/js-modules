import {
  Request,
  UseRequestEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';
import {
  useNodeChainsEntities,
  useNodeChainsReducerMetadata,
  useNodeChainsRequest,
} from './nodeChains.hooks';
import { NodeChainsGetManyRequestAction } from './nodeChains.actions.types';
import {
  NODE_CHAINS__GET_MANY__REQUEST_ID,
  createNodeChainsGetManyRequestAction,
} from './nodeChains.actions.creators';

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

  const callback = useCallback(() => {
    const action = createNodeChainsGetManyRequestAction();
    dispatch(action);
  }, [dispatch]);

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}
