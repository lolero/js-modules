import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useStateMainPurchase,
  useStateShoppingCartReducerMetadata,
} from '@js-modules/apps-vending-machine-common-store-redux';
import isEmpty from 'lodash/isEmpty';

export const ShoppingCartWorkspaceTopToolbar: React.FC = () => {
  const { request: purchaseRequest, callback: purchaseCallback } =
    useStateMainPurchase();

  const { pendingPurchases } = useStateShoppingCartReducerMetadata();

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        onClick={purchaseCallback}
        endIcon={purchaseRequest?.isPending && <CircularProgress size={20} />}
        disabled={isEmpty(pendingPurchases) || purchaseRequest?.isPending}
      >
        Buy products
      </Button>
    </Box>
  );
};
