import React from 'react';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { NavLeftDrawerTabsMetadata } from '../types/navLeftDrawerTabs.types';

/**
 * Get array of Material UI vertical <Tab />s to populate the <NavLeftDrawer/>,
 * through the 'navLeftDrawerContent' prop of <WorkspaceBox />
 *
 * @param {NavLeftDrawerTabsMetadata} tabsMetadata - The metadata for the
 * navigation's <Tab /> tree
 * @param {number} depthLevel - The navigation tree's depth level for which tabs
 * are being retrieved in the function call
 * @param {string} tabsValue - The selected tab's value
 * @param {boolean} isExpanded - Whether or not the <NavLeftDrawer /> is
 * expanded
 * @param {function} onClickCallback - Callback function to close the
 * <NavLeftDrawer /> when navigation to a tab's path occurs
 *
 * @returns {React.ReactNode[]} Array of <Tab />s
 */
export function getNavLeftDrawerTabs(
  tabsMetadata: NavLeftDrawerTabsMetadata,
  depthLevel: number,
  tabsValue: string,
  isExpanded: boolean,
  onClickCallback: () => void,
): React.ReactNode[] {
  const splitTabValue = tabsValue.split('/').slice(1);

  const modulesUpToDepthLevel = splitTabValue.slice(0, depthLevel + 1);

  const tabs = values(tabsMetadata).map((tabMetadata) => {
    let icon: React.ReactNode = null;
    if (isExpanded) {
      icon = <MuiFaIcon icon={tabMetadata.icon} />;
    } else {
      icon = (
        <Tooltip title={tabMetadata.label} disableInteractive>
          <MuiFaIcon icon={tabMetadata.icon} />
        </Tooltip>
      );
    }

    let label: React.ReactNode = null;
    if (isExpanded) {
      label = <Typography variant="body1">{tabMetadata.label}</Typography>;
    }

    let subTabs: React.ReactNode[] = [];
    if (tabMetadata.subTabs) {
      subTabs = getNavLeftDrawerTabs(
        tabMetadata.subTabs,
        depthLevel + 1,
        tabsValue,
        isExpanded,
        onClickCallback,
      );
    }

    const splitTabPath = tabMetadata.tabPath.split('/').slice(1);
    const tabModulesUpToDepthLevel = splitTabPath.slice(0, depthLevel + 1);
    const isSelectedParentTabSx = isEqual(
      tabModulesUpToDepthLevel,
      modulesUpToDepthLevel,
    );
    const selectedParentTabSx = isSelectedParentTabSx
      ? {
          color: 'primary.main',
          '& *': {
            color: 'inherit !important',
          },
        }
      : {};

    return [
      <Tab
        key={tabMetadata.tabPath}
        sx={{
          ml: 2 * depthLevel,
          ...selectedParentTabSx,
        }}
        value={tabMetadata.tabPath}
        icon={icon}
        label={label}
        component={Link}
        to={tabMetadata.tabPath}
        onClick={onClickCallback}
        iconPosition="start"
      />,
      ...subTabs,
    ];
  });

  const tabsFlat = flatten(tabs);

  return tabsFlat;
}
