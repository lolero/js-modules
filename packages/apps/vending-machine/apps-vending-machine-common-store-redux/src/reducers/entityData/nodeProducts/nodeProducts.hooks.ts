import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  createReducerHooks,
  Request,
  UseRequestEntities,
  UseRequestEntity,
  UseRequestVoid,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useStateAuthReducerMetadata } from '../../appState/stateAuth/stateAuth.exports';
import { NodeProduct, NodeProductsReducer } from './nodeProducts.types';
import { nodeProductsReducerSelectors } from './nodeProducts.selectors';
import {
  NodeProductsCreateOneRequestAction,
  NodeProductsDeleteOneRequestAction,
  NodeProductsGetManyRequestAction,
  NodeProductsGetOneRequestAction,
  NodeProductsUpdateOneWholeRequestAction,
} from './nodeProducts.actionsTypes';
import {
  createNodeProductsCreateOneRequestAction,
  createNodeProductsDeleteOneRequestAction,
  createNodeProductsGetManyRequestAction,
  createNodeProductsGetOneRequestAction,
  createNodeProductsUpdateOneWholeRequestAction,
  createNodeProductsUpdatePartialReducerMetadataRequestAction,
} from './nodeProducts.actionsCreators';

export const nodeProductsHooks = createReducerHooks(
  nodeProductsReducerSelectors,
);

export const {
  useRequest: useNodeProductsRequest,
  useRequests: useNodeProductsRequests,
  useReducerMetadata: useNodeProductsReducerMetadata,
  useEntity: useNodeProductsEntity,
  useEntities: useNodeProductsEntities,
  useReducerConfig: useNodeProductsReducerConfig,
} = nodeProductsHooks;

export function useNodeProductsCreateOne(): UseRequestEntity<
  NodeProductsCreateOneRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  (
    nodeProduct: NodeProductsCreateOneRequestAction['requestMetadata']['entity'],
  ) => void
> {
  const dispatch = useDispatch();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const nodeProductsRequests = useNodeProductsRequests();
  const [nodeProductsCreateOneRequestId, setNodeProductsCreateOneRequestId] =
    useState('');
  const nodeProductsCreateOneRequest = nodeProductsRequests[
    nodeProductsCreateOneRequestId
  ] as Request<NodeProductsCreateOneRequestAction['requestMetadata']>;
  const nodeProducts = useNodeProductsEntities();
  const nodeProductPkCreated = nodeProductsCreateOneRequest?.entityPks?.[0];
  const nodeProductCreated = nodeProducts[nodeProductPkCreated ?? ''];

  const nodeProductsCreateOneCallback = useCallback(
    (
      nodeProduct: NodeProductsCreateOneRequestAction['requestMetadata']['entity'],
    ) => {
      const nodeProductsCreateOneAction =
        createNodeProductsCreateOneRequestAction(nodeProduct);
      setNodeProductsCreateOneRequestId(nodeProductsCreateOneAction.requestId);
      dispatch(nodeProductsCreateOneAction);
    },
    [dispatch],
  );

  return {
    request: nodeProductsCreateOneRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entity: nodeProductCreated,
    callback: nodeProductsCreateOneCallback,
  };
}

export function useNodeProductsGetOne(
  nodeProductPk: string,
): UseRequestEntity<
  NodeProductsGetOneRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  () => void
> {
  const dispatch = useDispatch();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const nodeProducts = useNodeProductsEntities();
  const nodeProduct = nodeProducts[nodeProductPk];
  const nodeProductsRequests = useNodeProductsRequests();
  const [nodeProductsGetOneRequestId, setNodeProductsGetOneRequestId] =
    useState('');
  const nodeProductsGetOneRequest = nodeProductsRequests[
    nodeProductsGetOneRequestId
  ] as Request<NodeProductsGetOneRequestAction['requestMetadata']>;

  const nodeProductsGetOneCallback = useCallback(() => {
    if (nodeProduct || nodeProductsGetOneRequestId) {
      return;
    }

    const nodeProductsGetOneAction =
      createNodeProductsGetOneRequestAction(nodeProductPk);
    setNodeProductsGetOneRequestId(nodeProductsGetOneAction.requestId);
    dispatch(nodeProductsGetOneAction);
  }, [dispatch, nodeProductsGetOneRequestId, nodeProduct, nodeProductPk]);

  return {
    request: nodeProductsGetOneRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entity: nodeProduct,
    callback: nodeProductsGetOneCallback,
  };
}

export function useNodeProductsGetMany(): UseRequestEntities<
  NodeProductsGetManyRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  (forceFetch?: boolean, filterMyProducts?: boolean) => void
> {
  const dispatch = useDispatch();
  const { tokens } = useStateAuthReducerMetadata();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const { nodeProductsGetManyRequestId } = nodeProductsReducerMetadata;
  const nodeProducts = useNodeProductsEntities();
  const nodeProductsRequests = useNodeProductsRequests();
  const nodeProductsGetManyRequest = nodeProductsRequests[
    nodeProductsGetManyRequestId ?? ''
  ] as Request<NodeProductsGetManyRequestAction['requestMetadata']>;

  const nodeProductsGetManyCallback = useCallback(
    (forceFetch = false, filterMyProducts = false) => {
      if (nodeProductsGetManyRequestId && !forceFetch) {
        return;
      }

      const nodeProductsGetManyAction = createNodeProductsGetManyRequestAction(
        filterMyProducts ? tokens?.id.metadata.sub : undefined,
      );
      dispatch(
        createNodeProductsUpdatePartialReducerMetadataRequestAction({
          nodeProductsGetManyRequestId: nodeProductsGetManyAction.requestId,
        }),
      );
      dispatch(nodeProductsGetManyAction);
    },
    [dispatch, nodeProductsGetManyRequestId, tokens?.id.metadata.sub],
  );

  return {
    request: nodeProductsGetManyRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entities: nodeProducts,
    callback: nodeProductsGetManyCallback,
  };
}

export function useNodeProductsUpdateOneWhole(): UseRequestEntity<
  NodeProductsUpdateOneWholeRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  (
    nodeProductPk: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entityPk'],
    nodeProduct: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entity'],
  ) => void
> {
  const dispatch = useDispatch();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const nodeProductsRequests = useNodeProductsRequests();
  const [
    nodeProductsUpdateOneWholeRequestId,
    setNodeProductsUpdateOneWholeRequestId,
  ] = useState('');
  const nodeProductsUpdateOneWholeRequest = nodeProductsRequests[
    nodeProductsUpdateOneWholeRequestId
  ] as Request<NodeProductsUpdateOneWholeRequestAction['requestMetadata']>;
  const nodeProducts = useNodeProductsEntities();
  const nodeProductPkUpdated =
    nodeProductsUpdateOneWholeRequest?.entityPks?.[0];
  const nodeProductUpdated = nodeProducts[nodeProductPkUpdated ?? ''];

  const nodeProductsUpdateOneWholeCallback = useCallback(
    (
      nodeProductPk: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entityPk'],
      nodeProduct: NodeProductsUpdateOneWholeRequestAction['requestMetadata']['entity'],
    ) => {
      const nodeProductsUpdateOneWholeAction =
        createNodeProductsUpdateOneWholeRequestAction(
          nodeProductPk,
          nodeProduct,
        );
      setNodeProductsUpdateOneWholeRequestId(
        nodeProductsUpdateOneWholeAction.requestId,
      );
      dispatch(nodeProductsUpdateOneWholeAction);
    },
    [dispatch],
  );

  return {
    request: nodeProductsUpdateOneWholeRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entity: nodeProductUpdated,
    callback: nodeProductsUpdateOneWholeCallback,
  };
}

export function useNodeProductsDeleteOne(): UseRequestVoid<
  NodeProductsDeleteOneRequestAction['requestMetadata'],
  (
    nodeProductPk: NodeProductsDeleteOneRequestAction['requestMetadata']['entityPk'],
  ) => void
> {
  const dispatch = useDispatch();
  const nodeProductsRequests = useNodeProductsRequests();
  const [nodeProductsDeleteOneRequestId, setNodeProductsDeleteOneRequestId] =
    useState('');
  const nodeProductsDeleteOneRequest = nodeProductsRequests[
    nodeProductsDeleteOneRequestId
  ] as Request<NodeProductsDeleteOneRequestAction['requestMetadata']>;

  const nodeProductsDeleteOneCallback = useCallback(
    (
      nodeProductPk: NodeProductsDeleteOneRequestAction['requestMetadata']['entityPk'],
    ) => {
      const nodeProductsDeleteOneAction =
        createNodeProductsDeleteOneRequestAction(nodeProductPk);
      setNodeProductsDeleteOneRequestId(nodeProductsDeleteOneAction.requestId);
      dispatch(nodeProductsDeleteOneAction);
    },
    [dispatch],
  );

  return {
    request: nodeProductsDeleteOneRequest,
    callback: nodeProductsDeleteOneCallback,
  };
}
