import keys from 'lodash/keys';
import snakeCase from 'lodash/snakeCase';
import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { FindManyBooleansDto, RequestEntity } from '../types/types.requests';

export function utilGetFindManyBooleansWhereFactory<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManyBooleansDto: FindManyBooleansDto<EntityT>,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const booleanNames = keys(findManyBooleansDto);

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    booleanNames.forEach((booleanName, booleanNameIndex) => {
      const booleanKeyValue = (findManyBooleansDto[
        booleanName as keyof EntityT
      ] as boolean)
        ? 1
        : 0;
      const whereStr = `${query.alias}.${snakeCase(booleanName as string)} = :${
        booleanName as string
      }`;
      const whereParams = {
        [booleanName]: booleanKeyValue,
      };

      if (booleanNameIndex === 0) {
        whereExpressionBuilder.where(whereStr, whereParams);
      } else {
        whereExpressionBuilder.orWhere(whereStr, whereParams);
      }
    });
  };

  return whereFactory;
}
