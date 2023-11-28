import {
  createReducerHooks,
  Request,
  UseRequestEntity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { nodeFormsReducerSelectors } from './nodeForms.selectors';
import {
  useStateSettingsReducerMetadata,
  useStateSettingsRequest,
} from '../../appState/stateSettings/stateSettings.hooks';
import { NodeFormsUpdateOnePartialRequestAction } from './nodeForms.actionsTypes';
import { NodeForm, NodeFormsReducer } from './nodeForms.types';
import { createNodeFormsUpdateOnePartialRequestAction } from './nodeForms.actionsCreators';

export const nodeFormsHooks = createReducerHooks(nodeFormsReducerSelectors);

export const {
  useRequest: useNodeFormsRequest,
  useRequests: useNodeFormsRequests,
  useReducerMetadata: useNodeFormsReducerMetadata,
  useEntity: useNodeFormsEntity,
  useEntities: useNodeFormsEntities,
  useReducerConfig: useNodeFormsReducerConfig,
} = nodeFormsHooks;

export function useNodeFormsUpdateOnePartial(
  nodeFormPk: string,
): UseRequestEntity<
  NodeFormsUpdateOnePartialRequestAction['requestMetadata'],
  NodeFormsReducer['metadata'],
  NodeForm,
  (
    nodeFormPartial: NodeFormsUpdateOnePartialRequestAction['requestMetadata']['nodeFormPartial'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeFormsRequest(requestId) as Request<
    NodeFormsUpdateOnePartialRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeFormsReducerMetadata();
  const entity = useNodeFormsEntity(nodeFormPk);

  const callback = useCallback(
    (
      nodeFormPartial: NodeFormsUpdateOnePartialRequestAction['requestMetadata']['nodeFormPartial'],
    ) => {
      const action = createNodeFormsUpdateOnePartialRequestAction(
        nodeFormPk,
        nodeFormPartial,
      );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch, nodeFormPk],
  );

  return {
    request,
    reducerMetadata,
    entity,
    callback,
  };
}
