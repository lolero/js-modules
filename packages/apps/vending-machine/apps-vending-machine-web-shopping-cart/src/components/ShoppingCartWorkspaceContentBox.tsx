import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import {
  useNodeProductsEntities,
  useStateMainReducerMetadata,
  useStateShoppingCartAddItem,
  useStateShoppingCartRemainingBalance,
  useStateShoppingCartRemoveItem,
} from '@js-modules/apps-vending-machine-common-store-redux';
import keys from 'lodash/keys';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import Avatar from '@mui/material/Avatar';

export const ShoppingCartWorkspaceContentBox: React.FC = () => {
  const {
    reducerMetadata: { pendingPurchases },
    callback: addItemCallback,
  } = useStateShoppingCartAddItem();
  const { callback: removeItemCallback } = useStateShoppingCartRemoveItem();
  const remainingBalance = useStateShoppingCartRemainingBalance();

  const { purchasedProductPks, change } = useStateMainReducerMetadata();

  const nodeProducts = useNodeProductsEntities();
  const pendingNodeProductPks = keys(pendingPurchases);

  return (
    <Box>
      <Typography variant="h5">My shopping cart</Typography>
      {pendingNodeProductPks.length === 0 && (
        <Typography>The shopping cart is empty :(</Typography>
      )}
      {purchasedProductPks && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography>You got change!</Typography>
            {change?.map((value, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <Avatar key={`${index}-${value}`}>${value}</Avatar>;
            })}
          </Box>
          <Typography>
            Congratulations! You purchased the following items:
          </Typography>
          <List>
            {purchasedProductPks.map((nodeProductPk) => {
              const nodeProduct = nodeProducts[nodeProductPk]!;

              return (
                <ListItem
                  key={`purchased-${nodeProductPk}`}
                  sx={{ width: '300px' }}
                >
                  <ListItemText primary={nodeProduct.name} />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
      <List>
        {pendingNodeProductPks.map((nodeProductPk) => {
          const { quantity } = pendingPurchases[nodeProductPk];
          const nodeProduct = nodeProducts[nodeProductPk];

          return (
            <ListItem
              key={`pending-purchased${nodeProductPk}`}
              sx={{ width: '300px' }}
              secondaryAction={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <IconButton onClick={() => removeItemCallback(nodeProductPk)}>
                    <MuiFaIcon icon={faMinus} />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    disabled={remainingBalance < (nodeProduct?.cost ?? 0)}
                    onClick={() => addItemCallback(nodeProductPk)}
                  >
                    <MuiFaIcon icon={faPlus} />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText primary={nodeProduct?.name} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
