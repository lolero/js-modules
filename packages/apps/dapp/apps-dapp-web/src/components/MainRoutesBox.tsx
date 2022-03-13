import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeChainsGetManyRequestAction,
  createStateMainUpdatePartialReducerMetadataRequestAction,
  selectStateMainMetadata,
} from '@js-modules/apps-dapp-store-redux';
import HomeWorkspace from './HomeWorkspace';
import { Modules } from '../types/dappWebTypes';
import TokensWorkspace from './TokensWorkspace';

const appBoxSx = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
} as const;

const MainRoutesBox: React.FunctionComponent = () => {
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
    <Box sx={appBoxSx}>
      <Routes>
        <Route path={`/${Modules.tokens}`} element={<TokensWorkspace />} />
        <Route path="/*" element={<HomeWorkspace />} />
      </Routes>
    </Box>
  );
};

export default MainRoutesBox;
