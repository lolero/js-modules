import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesMyProducts,
} from '@js-modules/apps-vending-machine-common-constants';

export const MyProductsWorkspaceTopToolbar: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row-reverse',
      }}
    >
      <Button
        variant="contained"
        component={Link}
        to={
          myModulesRoutesMetadata[MyModules.myProducts].subRoutes![
            SubModulesMyProducts.createNew
          ].path
        }
      >
        Create new product
      </Button>
    </Box>
  );
};
