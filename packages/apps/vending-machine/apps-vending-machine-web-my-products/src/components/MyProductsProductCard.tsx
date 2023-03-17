import React, { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {
  createNodeProductsDeleteOneRequestAction,
  selectNodeProductsRequests,
  useNodeProductsGetOne,
  useStateDialogsCloseAll,
  useStateDialogsConfirmDialogOpen,
} from '@js-modules/apps-vending-machine-common-store-redux';
import {
  ConfirmDialogProps,
  MuiFaIcon,
} from '@js-modules/web-react-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesMyProducts,
} from '@js-modules/apps-vending-machine-common-constants';

type MyProductsProductCardProps = {
  nodeProductPk: string;
};

export const MyProductsProductCard: React.FC<MyProductsProductCardProps> = ({
  nodeProductPk,
}) => {
  const dispatch = useDispatch();
  const { request: getNodeProductRequest, entity: nodeProduct } =
    useNodeProductsGetOne(nodeProductPk);

  const { callback: closeAllCallback } = useStateDialogsCloseAll();
  const { callback: openConfirmDialogCallback } =
    useStateDialogsConfirmDialogOpen();

  const confirmDialogProps: ConfirmDialogProps = useMemo(() => {
    const deleteProductAction =
      createNodeProductsDeleteOneRequestAction(nodeProductPk);
    return {
      entityTypeName: 'product',
      entityName: nodeProduct!.name,
      actionName: 'Delete',
      actionRequestId: deleteProductAction.requestId,
      selectRequests: selectNodeProductsRequests,
      onSubmit: () => {
        dispatch(deleteProductAction);
      },
      onClose: closeAllCallback,
    };
  }, [closeAllCallback, dispatch, nodeProduct, nodeProductPk]);

  const updatePath = useMemo(() => {
    return `${
      myModulesRoutesMetadata[MyModules.myProducts].subRoutes![
        SubModulesMyProducts.edit
      ].path
    }/${nodeProduct!.id}`;
  }, [nodeProduct]);

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
            <Button
              sx={{
                mr: 1,
              }}
              size="small"
              variant="outlined"
              startIcon={<MuiFaIcon icon={faPenToSquare} />}
              component={Link}
              to={updatePath}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              endIcon={<MuiFaIcon icon={faTrashCan} />}
              onClick={() => openConfirmDialogCallback(confirmDialogProps)}
            >
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};
