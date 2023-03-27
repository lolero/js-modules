import { WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { DtoFindManySearch } from '../dtos/dto.findManySearch';
import { RequestEntity } from '../types/types.requests';

export function utilGetFindManySearchWhereFactory<
  EntityT extends RequestEntity,
>(
  findManySearchDto: DtoFindManySearch<EntityT>,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const { searchStr, entityPropNames } = findManySearchDto;

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    entityPropNames.forEach((entityPropName, uniqueKeyNameIndex) => {
      const whereStr = `${snakeCase(entityPropName as string)} = :${
        entityPropName as string
      }`;
      const whereParams = {
        [entityPropName]: searchStr,
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
