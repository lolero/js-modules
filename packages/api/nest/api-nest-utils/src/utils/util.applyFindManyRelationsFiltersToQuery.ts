import { In, SelectQueryBuilder } from 'typeorm';
import keys from 'lodash/keys';
import snakeCase from 'lodash/snakeCase';
import { FindManyRelationsDto, RequestEntity } from '../types/types.requests';

export function utilApplyFindManyRelationsFiltersToQuery<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManyRelationsDto: FindManyRelationsDto<EntityT>,
): SelectQueryBuilder<EntityT> {
  const queryAlias = query.alias;
  const relationNames = keys(findManyRelationsDto);

  relationNames.forEach((relationName) => {
    const relationNameIndividual = `${relationName}Individual`;
    query.innerJoin(`${queryAlias}.${relationName}`, relationNameIndividual);
  });
  relationNames.forEach((relationName, relationNameIndex) => {
    const relationNameIndividual = `${relationName}Individual`;
    const findManyUniqueKeysDto =
      findManyRelationsDto[relationName as keyof EntityT]!;
    const uniqueKeyNames = keys(findManyUniqueKeysDto);

    uniqueKeyNames.forEach((uniqueKeyName, uniqueKeyNameIndex) => {
      const uniqueKeyValues =
        findManyUniqueKeysDto[uniqueKeyName as keyof RequestEntity]!;
      const whereStr = `${relationNameIndividual}.${snakeCase(
        uniqueKeyName,
      )} = :${uniqueKeyName}`;
      const whereParams = {
        [uniqueKeyName]: In(uniqueKeyValues),
      };

      if (uniqueKeyNameIndex === 0 && relationNameIndex === 0) {
        query.where(whereStr, whereParams);
      } else {
        query.orWhere(whereStr, whereParams);
      }
    });
  });

  return query;
}
