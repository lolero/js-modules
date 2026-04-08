import upperCase from 'lodash/upperCase';
import type { SelectQueryBuilder } from 'typeorm';
import { camelToSnakeCaseWithAcronyms } from '@js-modules/common-utils-general-cjs';
import type { FindManyDto, RequestEntity } from '../types/types.requests';

export function utilApplyFindManySortingAndPaginationToQuery<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  dtoFindMany: FindManyDto<EntityT>,
): SelectQueryBuilder<EntityT> {
  if (dtoFindMany.order) {
    dtoFindMany.order.forEach(
      ({ entityPropName, orderDirection }, uniqueKeyIndex) => {
        if (uniqueKeyIndex === 0) {
          query.orderBy(
            `${query.alias}.${camelToSnakeCaseWithAcronyms(
              entityPropName as string,
            )}`,
            upperCase(orderDirection) as 'ASC' | 'DESC',
          );
        } else {
          query.addOrderBy(
            `${query.alias}.${camelToSnakeCaseWithAcronyms(
              entityPropName as string,
            )}`,
            upperCase(orderDirection) as 'ASC' | 'DESC',
          );
        }
      },
    );
  }

  if (dtoFindMany.pagination) {
    const { pageNumber, resultsPerPage } = dtoFindMany.pagination;

    let skip = 0;
    const take = resultsPerPage;
    if (dtoFindMany.pagination.pageNumber > 1) {
      skip = resultsPerPage * (pageNumber - 1);
    }

    query.skip(skip).take(take);
  }

  return query;
}
