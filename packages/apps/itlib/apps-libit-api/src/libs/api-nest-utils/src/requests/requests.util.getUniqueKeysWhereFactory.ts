import { In, WhereExpressionBuilder } from 'typeorm';
import keys from 'lodash/keys';
import snakeCase from 'lodash/snakeCase';

export function requestsUtilGetUniqueKeysWhereFactory(
  findManyUniqueKeysDto: unknown,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const uniqueKeyNames = keys(findManyUniqueKeysDto);

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    uniqueKeyNames.forEach((uniqueKeyName, uniqueKeyNameIndex) => {
      const uniqueKeyValues = (
        findManyUniqueKeysDto as Record<string, (number | string)[]>
      )[uniqueKeyName];
      const whereStr = `${snakeCase(uniqueKeyName)} = :${uniqueKeyName}`;
      const whereParams = {
        [uniqueKeyName]: In(uniqueKeyValues),
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
