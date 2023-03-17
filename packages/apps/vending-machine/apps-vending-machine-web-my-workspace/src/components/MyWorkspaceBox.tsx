import React, { useCallback, useEffect, useState } from 'react';
import { WorkspaceBox, WorkspaceBoxProps } from '@js-modules/web-react-nav';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useStateAuthLogin,
  useStateMainGetMyBalance,
} from '@js-modules/apps-vending-machine-common-store-redux';
import {
  myModulesRoutesMetadata,
  PublicModules,
  WEB_CLIENT_BASE_URI,
} from '@js-modules/apps-vending-machine-common-constants';
import {
  VendingMachineLogoLongBox,
  VendingMachineLogoShortBox,
  VendingMachineNavDrawerFooterBox,
  VendingMachineNavToolbar,
} from '@js-modules/apps-vending-machine-web-components';
import intersection from 'lodash/intersection';
import { MyWorkspaceNavDrawerContentBox } from './MyWorkspaceNavDrawerContentBox';
import { MyWorkspaceNavToolbarActionsBox } from './MyWorkspaceNavToolbarActionsBox';

export type MyWorkspaceBoxProps = {
  title: string;
  roles?: string[];
} & Pick<
  WorkspaceBoxProps,
  'workspaceTopToolbar' | 'workspaceContent' | 'contentSx'
>;

export const MyWorkspaceBox: React.FunctionComponent<MyWorkspaceBoxProps> = ({
  title,
  roles = [],
  workspaceTopToolbar,
  workspaceContent,
  contentSx,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPendingRedirectToPublicPath, setIsPendingRedirectToPublicPath] =
    useState(false);

  useStateMainGetMyBalance();

  const {
    reducerMetadata: { isAuthenticated, tokens },
    callback: loginCallback,
  } = useStateAuthLogin(WEB_CLIENT_BASE_URI, pathname);

  const getIsAuthorizedCallback = useCallback(() => {
    if (!isAuthenticated) {
      return false;
    }

    const userRoles = tokens?.access.metadata.realm_access?.roles ?? [];
    const rolesIntersection = intersection(userRoles, roles);
    const isUserAuthorized = rolesIntersection.length > 0;

    return isUserAuthorized;
  }, [isAuthenticated, roles, tokens?.access.metadata.realm_access?.roles]);

  const onNotAuthorizedCallback = useCallback(() => {
    if (!isAuthenticated) {
      loginCallback();
    } else {
      setIsPendingRedirectToPublicPath(true);
    }
  }, [isAuthenticated, loginCallback]);

  useEffect(() => {
    if (isPendingRedirectToPublicPath) {
      setIsPendingRedirectToPublicPath(false);
      navigate(myModulesRoutesMetadata[PublicModules.home].path, {
        replace: true,
      });
    }
  }, [isPendingRedirectToPublicPath, navigate]);

  return (
    <WorkspaceBox
      shortLogo={<VendingMachineLogoShortBox />}
      longLogo={<VendingMachineLogoLongBox />}
      homePath="/"
      navTopToolbar={
        <VendingMachineNavToolbar
          title={title}
          navActions={<MyWorkspaceNavToolbarActionsBox />}
        />
      }
      navLeftDrawerContent={<MyWorkspaceNavDrawerContentBox />}
      navLeftDrawerFooter={<VendingMachineNavDrawerFooterBox />}
      navRightDrawerContent={null}
      navRightDrawerFooter={null}
      workspaceTopToolbar={workspaceTopToolbar}
      workspaceContent={workspaceContent}
      isAuthorizedRequired
      getIsAuthorizedCallback={getIsAuthorizedCallback}
      onNotAuthorizedCallback={onNotAuthorizedCallback}
      contentSx={contentSx}
    />
  );
};
