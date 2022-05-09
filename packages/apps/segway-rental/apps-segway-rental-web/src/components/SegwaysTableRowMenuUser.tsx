import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  createStateDialogsUpdateWholeReducerMetadataRequestAction,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import Button from '@mui/material/Button';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';

type Props = {
  nodeSegwayPk: string;
};

const SegwaysTableRowMenuUser: React.FunctionComponent<Props> = ({
  nodeSegwayPk,
}) => {
  const dispatch = useDispatch();

  const { authUser } = useStateAuthReducerMetadata();

  const openReserveSegwayDialogCallback = useCallback(() => {
    const openReserveDialogRequestAction =
      createStateDialogsUpdateWholeReducerMetadataRequestAction({
        segwaysReserveDialogMetadata: {
          nodeSegwayPk,
          nodeUserPk: authUser?.uid || '',
        },
      });
    dispatch(openReserveDialogRequestAction);
  }, [authUser?.uid, dispatch, nodeSegwayPk]);

  return (
    <Button
      variant="contained"
      startIcon={<MuiFaIcon icon={faCalendarAlt} />}
      onClick={openReserveSegwayDialogCallback}
    >
      Reserve
    </Button>
  );
};

export const SegwaysTableRowMenuUserRaw = SegwaysTableRowMenuUser;
export const SegwaysTableRowMenuUserMemo = React.memo(
  SegwaysTableRowMenuUserRaw,
);
export default SegwaysTableRowMenuUserMemo;
