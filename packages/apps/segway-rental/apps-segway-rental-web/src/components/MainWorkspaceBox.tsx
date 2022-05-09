import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useStateDialogsReducerMetadata } from '@js-modules/apps-segway-rental-store-redux';
import { ConfirmDialog } from '@js-modules/web-react-components';
import { useChildNodeSize } from '@js-modules/web-react-hooks';
import MainNavBar from './MainNavBar';
import UsersEditDialog from './UsersEditDialog';
import SegwaysEditDialog from './SegwaysEditDialog';
import SegwaysReserveDialog from './SegwaysReserveDialog';

type Props = {
  children: {
    content: BoxProps['children'];
  };
};

const MainWorkspaceBox: React.FunctionComponent<Props> = ({
  children: { content },
}) => {
  const { nodeRef, nodeHeight } = useChildNodeSize<HTMLDivElement>();

  const {
    confirmDialogMetadata,
    segwaysEditDialogMetadata,
    segwaysReserveDialogMetadata,
    usersEditDialogMetadata,
  } = useStateDialogsReducerMetadata();

  return (
    <>
      <MainNavBar ref={nodeRef} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          px: '1em',
          mt: `${nodeHeight}px`,
          height: `calc(100% - ${nodeHeight}px)`,
        }}
      >
        {content}
        {!!confirmDialogMetadata && (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ConfirmDialog {...confirmDialogMetadata} />
        )}
        {!!segwaysEditDialogMetadata && <SegwaysEditDialog />}
        {!!segwaysReserveDialogMetadata && <SegwaysReserveDialog />}
        {!!usersEditDialogMetadata && <UsersEditDialog />}
      </Box>
    </>
  );
};

export const MainWorkspaceBoxRaw = MainWorkspaceBox;
export const MainWorkspaceBoxMemo = React.memo(MainWorkspaceBoxRaw);
export default MainWorkspaceBoxMemo;
