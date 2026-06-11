import type { Theme } from '@mui/material/styles';
import values from 'lodash/values';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_SIZE_REM,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_TO_EXPAND_GAP_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_INDENTATION_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_X_SPACING,
} from '../constants/nav.constants';

function getRoutesMetadataMaxNestingLevel<IconT>(
  routesMetadata: RoutesMetadata<IconT>,
): number {
  return values(routesMetadata).reduce<number>(
    (maxNestingLevel, routeMetadata) => {
      if (routeMetadata.isHidden) {
        return maxNestingLevel;
      }

      const subNestingLevel = routeMetadata.subRoutes
        ? getRoutesMetadataMaxNestingLevel(routeMetadata.subRoutes)
        : 0;

      return Math.max(maxNestingLevel, subNestingLevel + 1);
    },
    0,
  );
}

export function getNavLeftDrawerCollapsedWidth<IconT>(
  spacing: Theme['spacing'],
  routesMetadatas: RoutesMetadata<IconT>[] = [],
): string {
  const maxNestingLevel = Math.max(
    1,
    ...routesMetadatas.map(getRoutesMetadataMaxNestingLevel),
  );

  const fixedPixels =
    NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_TO_EXPAND_GAP_PIXELS +
    NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS +
    (maxNestingLevel - 1) * NAV_LEFT_DRAWER_TREE_VIEW_ITEM_INDENTATION_PIXELS;

  return `calc(${fixedPixels}px + ${NAV_LEFT_DRAWER_TREE_VIEW_ITEM_ICON_SIZE_REM}rem + 2 * ${spacing(
    NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_X_SPACING,
  )})`;
}
