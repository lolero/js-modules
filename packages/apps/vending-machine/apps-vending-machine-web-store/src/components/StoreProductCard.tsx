import React, { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import {
  useNodeProductsGetOne,
  useStateShoppingCartAddItem,
  useStateShoppingCartRemainingBalance,
} from '@js-modules/apps-vending-machine-common-store-redux';

type StoreProductCardProps = {
  nodeProductPk: string;
};

export const StoreProductCard: React.FC<StoreProductCardProps> = ({
  nodeProductPk,
}) => {
  const { request: getNodeProductRequest, entity: nodeProduct } =
    useNodeProductsGetOne(nodeProductPk);
  const remainingBalance = useStateShoppingCartRemainingBalance();

  const {
    reducerMetadata: { pendingPurchases },
    callback: addItemCallback,
  } = useStateShoppingCartAddItem();

  const shoppingCartCount = useMemo(() => {
    return pendingPurchases[nodeProductPk]?.quantity ?? 0;
  }, [nodeProductPk, pendingPurchases]);

  return (
    <Card sx={{ width: 200, minWidth: 200 }}>
      {getNodeProductRequest?.isPending && (
        <CardContent>
          <Skeleton variant="rectangular" width={240} height={240} />
        </CardContent>
      )}
      {nodeProduct && (
        <>
          <CardContent>
            <Typography variant="h5">{nodeProduct.name}</Typography>
            <br />
            <Typography>Price: ${nodeProduct.cost}</Typography>
            <br />
            <Typography>{nodeProduct.amountAvailable} available</Typography>
          </CardContent>
          <CardActions>
            <Badge
              color="primary"
              badgeContent={shoppingCartCount}
              invisible={shoppingCartCount === 0}
            >
              <Button
                size="small"
                onClick={() => addItemCallback(nodeProductPk)}
                disabled={
                  shoppingCartCount >= nodeProduct.amountAvailable ||
                  remainingBalance < nodeProduct.cost
                }
              >
                Add to cart
              </Button>
            </Badge>
          </CardActions>
        </>
      )}
    </Card>
  );
};
