import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {
  MyModules,
  myModulesRoutesMetadata,
} from '@js-modules/apps-vending-machine-common-constants';
import { useStateShoppingCartIsPendingPurchases } from '@js-modules/apps-vending-machine-common-store-redux';
import { MyWorkspaceAccountMenu } from './MyWorkspaceAccountMenu';

export const MyWorkspaceNavToolbarActionsBox: React.FC = () => {
  const isPendingPurchases = useStateShoppingCartIsPendingPurchases();

  return (
    <Box>
      <Badge color="secondary" variant="dot" invisible={!isPendingPurchases}>
        <IconButton
          size="small"
          component={Link}
          to={myModulesRoutesMetadata[MyModules.shoppingCart].path}
        >
          <MuiFaIcon icon={faCartShopping} />
        </IconButton>
      </Badge>
      <MyWorkspaceAccountMenu />
    </Box>
  );
};
