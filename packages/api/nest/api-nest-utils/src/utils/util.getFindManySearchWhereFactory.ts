import type { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { camelToSnakeCaseWithAcronyms } from '@js-modules/common-utils-general-cjs';
import type { DtoFindManySearch } from '../dtos/dto.findManySearch';
import type { RequestEntity } from '../types/types.requests';

export function utilGetFindManySearchWhereFactory<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManySearchDto: DtoFindManySearch<EntityT>,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const { searchStr, entityPropNames } = findManySearchDto;

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    entityPropNames.forEach((entityPropName, uniqueKeyNameIndex) => {
      const whereStr = `${query.alias}.${camelToSnakeCaseWithAcronyms(
        entityPropName as string,
      )} LIKE :${entityPropName as string}`;
      const whereParams = {
        [entityPropName]: `%${searchStr}%`,
      };

      if (uniqueKeyNameIndex === 0) {
        whereExpressionBuilder.where(whereStr, whereParams);
      } else {
        whereExpressionBuilder.orWhere(whereStr, whereParams);
      }
    });
  };

  return whereFactory;
}
