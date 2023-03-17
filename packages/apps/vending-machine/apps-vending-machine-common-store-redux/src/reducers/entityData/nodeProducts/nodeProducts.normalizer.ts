import {
  ProductsDtoPublic,
  ProductsDtoUpdateOneWhole,
} from '@js-modules/apps-vending-machine-api-core-modules';
import values from 'lodash/values';
import { NodeProduct, NodeProductsReducer } from './nodeProducts.types';
import { getPkOfNodeProduct } from './nodeProducts.pkUtils';

export function normalizeNodeProductsRawArray(
  nodeProductsRaw: ProductsDtoPublic[],
): NodeProductsReducer['data'] {
  const normalizedNodeProducts: NodeProductsReducer['data'] =
    nodeProductsRaw.reduce(
      (
        normalizedNodeProductsTemp: NodeProductsReducer['data'],
        nodeProductRaw,
      ) => {
        const nodeProduct: NodeProduct = {
          id: nodeProductRaw.id,
          name: nodeProductRaw.name,
          cost: nodeProductRaw.cost,
          amountAvailable: nodeProductRaw.amountAvailable,
          __edges__: {
            seller: [`${nodeProductRaw.sellerId}`],
          },
        };

        return {
          ...normalizedNodeProductsTemp,
          [getPkOfNodeProduct(nodeProduct)]: nodeProduct,
        };
      },
      {},
    );

  return normalizedNodeProducts;
}

export function denormalizeNodeProducts(
  nodeProducts: NodeProductsReducer['data'],
): ProductsDtoUpdateOneWhole[] {
  const denormalizedNodeProductsArray = values(nodeProducts).map(
    (nodeProduct) => {
      const denormalizedNodeProduct: ProductsDtoUpdateOneWhole = {
        id: nodeProduct.id,
        name: nodeProduct.name,
        cost: nodeProduct.cost,
        amountAvailable: nodeProduct.amountAvailable,
      };

      return denormalizedNodeProduct;
    },
  );

  return denormalizedNodeProductsArray;
}
