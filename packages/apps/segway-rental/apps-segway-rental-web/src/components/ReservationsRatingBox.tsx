import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import { noop } from 'lodash';
import {
  createNodeReservationsUpdateOneWholeRequestAction,
  NodeReservation,
  useNodeReservationsEntity,
} from '@js-modules/apps-segway-rental-store-redux';

type Props = {
  nodeReservationPk: string;
};

const ReservationsRatingBox: React.FunctionComponent<Props> = ({
  nodeReservationPk,
}) => {
  const dispatch = useDispatch();

  const nodeReservation = useNodeReservationsEntity(
    nodeReservationPk,
  ) as NodeReservation;

  const setRatingCallback = useCallback(
    (
      e:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      const rating = Number(e.currentTarget.getAttribute('data-key'));

      const updatedNodeReservation: NodeReservation = {
        ...nodeReservation,
        rating,
      };

      const setRatingRequestAction =
        createNodeReservationsUpdateOneWholeRequestAction(
          nodeReservationPk,
          updatedNodeReservation,
        );

      dispatch(setRatingRequestAction);
    },
    [dispatch, nodeReservation, nodeReservationPk],
  );

  return (
    <Box>
      {new Array(5).fill(null).map((value, index) => {
        const ratingKey = `rating-button-${index + 1}-${nodeReservationPk}`;
        return (
          <IconButton
            key={ratingKey}
            sx={{
              cursor: nodeReservation.rating === index + 1 ? 'auto' : 'pointer',
            }}
            onClick={
              nodeReservation.rating === index + 1 ? noop : setRatingCallback
            }
            data-key={index + 1}
          >
            <Avatar
              sx={{
                bgcolor:
                  nodeReservation.rating === index + 1
                    ? 'primary.main'
                    : 'inherit',
              }}
            >
              {index + 1}
            </Avatar>
          </IconButton>
        );
      })}
    </Box>
  );
};

export const ReservationsRatingBoxRaw = ReservationsRatingBox;
export const ReservationsRatingBoxMemo = React.memo(ReservationsRatingBoxRaw);
export default ReservationsRatingBoxMemo;
