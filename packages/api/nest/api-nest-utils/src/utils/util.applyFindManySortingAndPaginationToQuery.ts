import { SelectQueryBuilder } from 'typeorm';
import upperCase from 'lodash/upperCase';
import { RequestEntity } from '../types/types.requests';
import { DtoFindMany } from '../dtos/dto.findMany';

export function utilApplyFindManySortingAndPaginationToQuery<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  dtoFindMany: DtoFindMany<EntityT>,
): SelectQueryBuilder<EntityT> {
  let skip = 0;
  if (dtoFindMany.resultsPerPage && dtoFindMany.page && dtoFindMany.page > 1) {
    skip = dtoFindMany.resultsPerPage * (dtoFindMany.page - 1);
  }

  let take = Infinity;
  if (dtoFindMany.resultsPerPage) {
    take = dtoFindMany.resultsPerPage;
  }

  query
    .orderBy(
      ':sortBy',
      upperCase(dtoFindMany.sortOrder ?? 'asc') as 'ASC' | 'DESC',
    )
    .setParameters({ sortBy: dtoFindMany.sortBy ?? 'username' })
    .skip(skip)
    .take(take);

  return query;
}
