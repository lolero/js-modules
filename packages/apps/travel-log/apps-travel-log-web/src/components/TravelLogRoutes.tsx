import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNodeChainsGetManyRequestAction,
  createStateMainUpdatePartialReducerMetadataRequestAction,
  selectStateMainMetadata,
} from '@js-modules/apps-dapp-common-stores-redux';
import { Modules } from '@js-modules/apps-dapp-common-constants';
import { WebPortfolioRoutes } from '@js-modules/apps-dapp-web-portfolio';
import { WebAnalyticsRoutes } from '@js-modules/apps-dapp-web-analytics';

export const TravelLogRoutes: React.FunctionComponent = () => {
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
      <Route path={`${Modules.portfolio}/*`} element={<WebPortfolioRoutes />} />
      <Route path={`${Modules.analytics}/*`} element={<WebAnalyticsRoutes />} />
      <Route
        path="*"
        element={<Navigate replace to={`/${Modules.portfolio}`} />}
      />
    </Routes>
  );
};
