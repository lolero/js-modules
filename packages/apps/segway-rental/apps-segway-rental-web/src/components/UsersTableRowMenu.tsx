import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import {
  createNodeUsersDeleteOneRequestAction,
  createStateDialogsUpdateWholeReducerMetadataRequestAction,
  NodeUser,
  selectNodeUsersRequests,
  useNodeUsersEntity,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { useMenuUtils } from '@js-modules/web-react-hooks';
import { menuItemSx } from '@js-modules/web-styles-material-ui';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

type Props = {
  nodeUserPk: string;
};

const UsersTableRowMenu: React.FunctionComponent<Props> = ({ nodeUserPk }) => {
  const dispatch = useDispatch();

  const nodeUser = useNodeUsersEntity(nodeUserPk) as NodeUser;

  const { authUser } = useStateAuthReducerMetadata();

  const { menuAnchor, openMenuCallback, closeMenuCallback } = useMenuUtils();

  const closeAllDialogsCallBack = useCloseAllDialogsCallBack();

  const editCallback = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLAnchorElement>,
    ) => {
      const openEditDialogRequestAction =
        createStateDialogsUpdateWholeReducerMetadataRequestAction({
          usersEditDialogMetadata: {
            nodeUserPk,
          },
        });
      dispatch(openEditDialogRequestAction);
      closeMenuCallback(e);
    },
    [closeMenuCallback, dispatch, nodeUserPk],
  );

  const deleteCallback = useCallback(
    (
      e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLAnchorElement>,
    ) => {
      const deleteRequestAction =
        createNodeUsersDeleteOneRequestAction(nodeUserPk);
      const openConfirmDialogRequestAction =
        createStateDialogsUpdateWholeReducerMetadataRequestAction({
          confirmDialogMetadata: {
            entityTypeName: 'user',
            entityName: nodeUser.displayName,
            actionName: 'delete',
            actionRequestId: deleteRequestAction.requestId,
            selectRequests: selectNodeUsersRequests,
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
      nodeUser.displayName,
      nodeUserPk,
    ],
  );

  return (
    <>
      <IconButton onClick={openMenuCallback} size="small">
        <MuiFaIcon icon={faEllipsisV} />
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
          disabled={authUser?.uid === nodeUser.uid}
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

export const UsersTableRowMenuRaw = UsersTableRowMenu;
export const UsersTableRowMenuMemo = React.memo(UsersTableRowMenuRaw);
export default UsersTableRowMenuMemo;
