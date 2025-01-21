import { SelectQueryBuilder } from 'typeorm';
import upperCase from 'lodash/upperCase';
import snakeCase from 'lodash/snakeCase';
import { RequestEntity } from '../types/types.requests';
import { DtoFindMany } from '../dtos/dto.findMany';

export function utilApplyFindManySortingAndPaginationToQuery<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  dtoFindMany: DtoFindMany<EntityT>,
): SelectQueryBuilder<EntityT> {
  let skip = 0;
  let take;
  if (dtoFindMany.pagination) {
    const { pageNumber, resultsPerPage } = dtoFindMany.pagination;

    take = resultsPerPage;
    if (dtoFindMany.pagination.pageNumber > 1) {
      skip = resultsPerPage * (pageNumber - 1);
    }
  }

  if (dtoFindMany.order) {
    dtoFindMany.order.forEach(
      ({ entityPropName, orderDirection }, uniqueKeyIndex) => {
        if (uniqueKeyIndex === 0) {
          query.orderBy(
            `${query.alias}.${snakeCase(entityPropName as string)}`,
            upperCase(orderDirection) as 'ASC' | 'DESC',
          );
        } else {
          query.addOrderBy(
            `${query.alias}.${snakeCase(entityPropName as string)}`,
            upperCase(orderDirection) as 'ASC' | 'DESC',
          );
        }
      },
    );
  }

  query.skip(skip).take(take);

  return query;
}
