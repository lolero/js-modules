import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import {
  createReducerHooks,
  Request,
  UseRequestCallback,
  UseRequestEntities,
  UseRequestEntity,
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

export function useNodeProductsCreateOne(): UseRequestCallback<
  NodeProductsCreateOneRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  (
    nodeProduct: NodeProductsCreateOneRequestAction['requestMetadata']['entity'],
  ) => void
> {
  const dispatch = useDispatch();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const nodeProducts = useNodeProductsEntities();
  const nodeProductsRequests = useNodeProductsRequests();
  const [nodeProductsCreateOneRequestId, setNodeProductsCreateOneRequestId] =
    useState('');
  const nodeProductsCreateOneRequest = nodeProductsRequests[
    nodeProductsCreateOneRequestId
  ] as Request<NodeProductsCreateOneRequestAction['requestMetadata']>;

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
    entities: nodeProducts,
    callback: nodeProductsCreateOneCallback,
  };
}

export function useNodeProductsGetOne(
  nodeProductPk: string,
): UseRequestEntity<
  NodeProductsGetOneRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct
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

  useEffect(() => {
    if (nodeProduct || nodeProductsGetOneRequestId) {
      return;
    }

    const nodeProductsGetOneAction =
      createNodeProductsGetOneRequestAction(nodeProductPk);
    setNodeProductsGetOneRequestId(nodeProductsGetOneAction.requestId);
    dispatch(nodeProductsGetOneAction);
  }, [
    dispatch,
    nodeProductsGetOneRequest,
    nodeProductsGetOneRequestId,
    nodeProduct,
    nodeProductPk,
  ]);

  return {
    request: nodeProductsGetOneRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entity: nodeProduct,
  };
}

export function useNodeProductsGetMany(
  forceFetch = false,
  filterMyProducts = false,
): UseRequestEntities<
  NodeProductsGetManyRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct
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

  useEffect(() => {
    if (forceFetch) {
      dispatch(
        createNodeProductsUpdatePartialReducerMetadataRequestAction({
          nodeProductsGetManyRequestId: null,
        }),
      );
    }
  }, [dispatch, forceFetch]);

  useEffect(() => {
    if (nodeProductsGetManyRequestId) {
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
  }, [
    dispatch,
    filterMyProducts,
    nodeProductsGetManyRequestId,
    tokens?.id.metadata.sub,
  ]);

  return {
    request: nodeProductsGetManyRequest,
    reducerMetadata: nodeProductsReducerMetadata,
    entities: nodeProducts,
  };
}

export function useNodeProductsUpdateOneWhole(): UseRequestCallback<
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
  const nodeProducts = useNodeProductsEntities();
  const nodeProductsRequests = useNodeProductsRequests();
  const [
    nodeProductsUpdateOneWholeRequestId,
    setNodeProductsUpdateOneWholeRequestId,
  ] = useState('');
  const nodeProductsUpdateOneWholeRequest = nodeProductsRequests[
    nodeProductsUpdateOneWholeRequestId
  ] as Request<NodeProductsUpdateOneWholeRequestAction['requestMetadata']>;

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
    entities: nodeProducts,
    callback: nodeProductsUpdateOneWholeCallback,
  };
}

export function useNodeProductsDeleteOne(): UseRequestCallback<
  NodeProductsDeleteOneRequestAction['requestMetadata'],
  NodeProductsReducer['metadata'],
  NodeProduct,
  (
    nodeProductPk: NodeProductsDeleteOneRequestAction['requestMetadata']['entityPk'],
  ) => void
> {
  const dispatch = useDispatch();
  const nodeProductsReducerMetadata = useNodeProductsReducerMetadata();
  const nodeProducts = useNodeProductsEntities();
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
    reducerMetadata: nodeProductsReducerMetadata,
    entities: nodeProducts,
    callback: nodeProductsDeleteOneCallback,
  };
}
