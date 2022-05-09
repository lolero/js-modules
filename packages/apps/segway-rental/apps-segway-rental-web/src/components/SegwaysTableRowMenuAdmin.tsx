import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import {
  createNodeSegwaysDeleteOneRequestAction,
  createStateDialogsUpdateWholeReducerMetadataRequestAction,
  NodeSegway,
  selectNodeSegwaysRequests,
  useNodeSegwaysEntity,
  UserRoles,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import { menuItemSx } from '@js-modules/web-styles-material-ui';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

type Props = {
  nodeSegwayPk: string;
};

const SegwaysTableRowMenuAdmin: React.FunctionComponent<Props> = ({
  nodeSegwayPk,
}) => {
  const dispatch = useDispatch();

  const nodeSegway = useNodeSegwaysEntity(nodeSegwayPk) as NodeSegway;

  const { authUserRole } = useStateAuthReducerMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const closeAllDialogsCallBack = useCloseAllDialogsCallBack();

  const editCallback = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLAnchorElement>,
    ) => {
      const openEditDialogRequestAction =
        createStateDialogsUpdateWholeReducerMetadataRequestAction({
          segwaysEditDialogMetadata: {
            nodeSegwayPk,
          },
        });
      dispatch(openEditDialogRequestAction);
      closeMenuCallback(e);
    },
    [closeMenuCallback, dispatch, nodeSegwayPk],
  );

  const deleteCallback = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLAnchorElement>,
    ) => {
      const deleteRequestAction =
        createNodeSegwaysDeleteOneRequestAction(nodeSegwayPk);
      const openConfirmDialogRequestAction =
        createStateDialogsUpdateWholeReducerMetadataRequestAction({
          confirmDialogMetadata: {
            entityTypeName: 'segway',
            entityName: nodeSegway.model,
            actionName: 'delete',
            actionRequestId: deleteRequestAction.requestId,
            selectRequests: selectNodeSegwaysRequests,
            onSubmit: () => {
              dispatch(deleteRequestAction);
            },
            onClose: closeAllDialogsCallBack,
          },
        });
      dispatch(openConfirmDialogRequestAction);
      closeMenuCallback(e);
    },
    [
      closeAllDialogsCallBack,
      closeMenuCallback,
      dispatch,
      nodeSegway.model,
      nodeSegwayPk,
    ],
  );

  return (
    <>
      <IconButton onClick={openMenuCallback} size="small">
        <MuiFaIcon icon={faEllipsis} />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={closeMenuCallback}
      >
        <MenuItem sx={menuItemSx.menuItem} onClick={editCallback}>
          <Box sx={menuItemSx.menuItemLabelBox}>
            <MuiFaIcon
              sx={menuItemSx.menuItemIcon}
              icon={faEdit}
              fontSize="small"
            />
            <Typography>Edit</Typography>
          </Box>
        </MenuItem>
        <MenuItem
          sx={menuItemSx.menuItem}
          disabled={authUserRole !== UserRoles.admin}
          onClick={deleteCallback}
        >
          <Box sx={menuItemSx.menuItemLabelBox}>
            <MuiFaIcon
              sx={menuItemSx.menuItemIcon}
              icon={faTrashAlt}
              fontSize="small"
            />
            <Typography>Delete</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export const SegwaysTableRowMenuAdminRaw = SegwaysTableRowMenuAdmin;
export const SegwaysTableRowMenuAdminMemo = React.memo(
  SegwaysTableRowMenuAdminRaw,
);
export default SegwaysTableRowMenuAdminMemo;
