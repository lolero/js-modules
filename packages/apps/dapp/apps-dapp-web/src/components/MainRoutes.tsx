import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeChainsGetManyRequestAction,
  createStateMainUpdatePartialReducerMetadataRequestAction,
  selectStateMainMetadata,
} from '@js-modules/apps-dapp-store-redux';
import HomeWorkspace from './HomeWorkspace';
import { Modules } from '../types/dappWebTypes';
import TokensWorkspace from './TokensWorkspace';

export const MainRoutes: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { getNodeChainsRequestId } = useSelector(selectStateMainMetadata);

  useEffect(() => {
    if (!getNodeChainsRequestId) {
      const getNodeChainsRequestAction = createNodeChainsGetManyRequestAction();
      const updateGetNodeChainsRequestIdAction =
        createStateMainUpdatePartialReducerMetadataRequestAction({
          getNodeChainsRequestId: getNodeChainsRequestAction.requestId,
        });
      dispatch(updateGetNodeChainsRequestIdAction);
      dispatch(getNodeChainsRequestAction);
    }
  }, [dispatch, getNodeChainsRequestId]);

  return (
    <Routes>
      <Route path="/test" element={<TokensWorkspace />} />
      <Route path={`/${Modules.tokens}`} element={<TokensWorkspace />} />
      <Route path="/*" element={<HomeWorkspace />} />
    </Routes>
  );
};
