import keys from 'lodash/keys';
import type { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { camelToSnakeCaseWithAcronyms } from '@js-modules/common-utils-general-cjs';
import type {
  FindManyUniqueKeysDto,
  RequestEntity,
} from '../types/types.requests';

export function utilGetFindManyUniqueKeysWhereFactory<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManyUniqueKeysDto: FindManyUniqueKeysDto<EntityT>,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const uniqueKeyNames = keys(findManyUniqueKeysDto);

  const whereFactory = (
    whereExpressionBuilder: WhereExpressionBuilder,
  ): void => {
    uniqueKeyNames.forEach((uniqueKeyName, uniqueKeyNameIndex) => {
      const uniqueKeyValues =
        findManyUniqueKeysDto[uniqueKeyName as keyof EntityT]!;
      const whereStr = `${query.alias}.${camelToSnakeCaseWithAcronyms(
        uniqueKeyName,
      )} IN (:...${uniqueKeyName})`;
      const whereParams = {
        [uniqueKeyName]: uniqueKeyValues,
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
