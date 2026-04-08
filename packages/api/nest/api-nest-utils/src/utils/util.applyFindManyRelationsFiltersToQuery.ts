import keys from 'lodash/keys';
import type { SelectQueryBuilder } from 'typeorm';
import { camelToSnakeCaseWithAcronyms } from '@js-modules/common-utils-general-cjs';
import type {
  FindManyRelationsDto,
  RequestEntity,
} from '../types/types.requests';

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
    query.innerJoinAndSelect(
      `${queryAlias}.${relationName}`,
      relationNameIndividual,
    );
  });
  let whereClauseAdded = false;
  relationNames.forEach((relationName) => {
    const relationNameIndividual = `${relationName}Individual`;
    const findManyUniqueKeysDto =
      findManyRelationsDto[relationName as keyof EntityT]!;
    const uniqueKeyNames = keys(findManyUniqueKeysDto);

    uniqueKeyNames.forEach((uniqueKeyName) => {
      const uniqueKeyValues = findManyUniqueKeysDto[uniqueKeyName];

      if (!uniqueKeyValues) {
        return;
      }

      const whereStr = `${relationNameIndividual}.${camelToSnakeCaseWithAcronyms(
        uniqueKeyName,
      )} IN (:...${relationNameIndividual}${uniqueKeyName})`;
      const whereParams = {
        [`${relationNameIndividual}${uniqueKeyName}`]: uniqueKeyValues,
      };

      if (!whereClauseAdded) {
        query.where(whereStr, whereParams);
        whereClauseAdded = true;
      } else {
        query.orWhere(whereStr, whereParams);
      }
    });
  });

  return query;
}
