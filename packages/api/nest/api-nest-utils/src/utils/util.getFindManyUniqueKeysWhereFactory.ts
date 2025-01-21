import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import keys from 'lodash/keys';
import snakeCase from 'lodash/snakeCase';
import { FindManyUniqueKeysDto, RequestEntity } from '../types/types.requests';

export function utilGetFindManyUniqueKeysWhereFactory<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManyUniqueKeysDto: FindManyUniqueKeysDto<EntityT>,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const uniqueKeyNames = keys(findManyUniqueKeysDto);

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    uniqueKeyNames.forEach((uniqueKeyName, uniqueKeyNameIndex) => {
      const uniqueKeyValues =
        findManyUniqueKeysDto[uniqueKeyName as keyof EntityT]!;
      const whereStr = `${query.alias}.${snakeCase(
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
