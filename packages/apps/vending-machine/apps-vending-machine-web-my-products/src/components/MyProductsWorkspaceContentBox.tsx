import React from 'react';
import Box from '@mui/material/Box';
import {
  getPkOfNodeProduct,
  useNodeProductsGetMany,
} from '@js-modules/apps-vending-machine-common-store-redux';
import Skeleton from '@mui/material/Skeleton';
import values from 'lodash/values';
import { MyProductsProductCard } from './MyProductsProductCard';

export const MyProductsWorkspaceContentBox: React.FC = () => {
  const { request: getProductsRequest, entities: nodeProducts } =
    useNodeProductsGetMany(true, true);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {getProductsRequest?.isPending && (
        <>
          <Skeleton variant="rectangular" width={600} height={60} />
          <Skeleton variant="rectangular" width={600} height={60} />
        </>
      )}
      {values(nodeProducts).map((nodeProduct) => {
        const nodeProductPk = getPkOfNodeProduct(nodeProduct!);
        return (
          <MyProductsProductCard
            key={nodeProductPk}
            nodeProductPk={nodeProductPk}
          />
        );
      })}
    </Box>
  );
};
