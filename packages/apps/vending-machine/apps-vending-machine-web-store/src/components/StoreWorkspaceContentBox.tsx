import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import {
  getPkOfNodeProduct,
  useNodeProductsGetMany,
  useStateMainReducerMetadata,
} from '@js-modules/apps-vending-machine-common-store-redux';
import values from 'lodash/values';
import { StoreProductCard } from './StoreProductCard';

export const StoreWorkspaceContentBox: React.FC = () => {
  const { change } = useStateMainReducerMetadata();
  const { request: getProductsRequest, entities: nodeProducts } =
    useNodeProductsGetMany(true);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {change && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography>You got change!</Typography>
          {change.map((value, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <Avatar key={`${index}-${value}`}>${value}</Avatar>;
          })}
        </Box>
      )}
      {getProductsRequest?.isPending && (
        <>
          <Skeleton variant="rectangular" width={600} height={60} />
          <Skeleton variant="rectangular" width={600} height={60} />
        </>
      )}
      {values(nodeProducts).map((nodeProduct) => {
        const nodeProductPk = getPkOfNodeProduct(nodeProduct!);
        return (
          <StoreProductCard key={nodeProductPk} nodeProductPk={nodeProductPk} />
        );
      })}
    </Box>
  );
};
