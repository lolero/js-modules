import { Brackets, SelectQueryBuilder } from 'typeorm';
import isEmpty from 'lodash/isEmpty';
import { BadRequestException } from '@nestjs/common';
import { RequestEntity } from '../types/types.requests';
import { DtoFindMany } from '../dtos/dto.findMany';
import { utilGetFindManyUniqueKeysWhereFactory } from './util.getFindManyUniqueKeysWhereFactory';
import { utilGetFindManySearchWhereFactory } from './util.getFindManySearchWhereFactory';
import {
  FindManyRangeType,
  utilGetFindManyRangesWhereFactory,
} from './util.getFindManyRangesWhereFactory';
import { utilApplyFindManyRelationsFiltersToQuery } from './util.applyFindManyRelationsFiltersToQuery';
import { utilGetFindManyBooleansWhereFactory } from './util.getFindManyBooleansWhereFactory';

export function utilApplyFindManyFiltersToQuery<EntityT extends RequestEntity>(
  query: SelectQueryBuilder<EntityT>,
  dtoFindMany: DtoFindMany<EntityT>,
  eagerFetchRelations: (keyof EntityT)[] = [],
): SelectQueryBuilder<EntityT> {
  if (dtoFindMany.uniqueKeys && !isEmpty(dtoFindMany.uniqueKeys)) {
    if (
      dtoFindMany.search ||
      dtoFindMany.relations ||
      dtoFindMany.dateRanges ||
      dtoFindMany.numberRanges ||
      dtoFindMany.stringRanges ||
      dtoFindMany.booleans
    ) {
      throw new BadRequestException(
        'filtering by unique keys is only supported on its own and cannot be combined with search, relations, dateRanges, numberRanges, stringRanges or booleans',
      );
    }

    const findManyUniqueKeysWhereFactory =
      utilGetFindManyUniqueKeysWhereFactory(query, dtoFindMany.uniqueKeys);
    query.andWhere(new Brackets(findManyUniqueKeysWhereFactory));
  } else {
    if (dtoFindMany.search) {
      const findManySearchWhereFactory = utilGetFindManySearchWhereFactory(
        query,
        dtoFindMany.search,
      );
      query.andWhere(new Brackets(findManySearchWhereFactory));
    }

    if (dtoFindMany.relations) {
      utilApplyFindManyRelationsFiltersToQuery(query, dtoFindMany.relations);
    }

    if (dtoFindMany.dateRanges) {
      const findManyDateRangesWhereFactory = utilGetFindManyRangesWhereFactory(
        query,
        dtoFindMany.dateRanges,
        FindManyRangeType.date,
      );
      query.andWhere(new Brackets(findManyDateRangesWhereFactory));
    }

    if (dtoFindMany.numberRanges) {
      const findManyNumberRangesWhereFactory =
        utilGetFindManyRangesWhereFactory(
          query,
          dtoFindMany.numberRanges,
          FindManyRangeType.number,
        );
      query.andWhere(new Brackets(findManyNumberRangesWhereFactory));
    }

    if (dtoFindMany.stringRanges) {
      const findManyStringRangesWhereFactory =
        utilGetFindManyRangesWhereFactory(
          query,
          dtoFindMany.stringRanges,
          FindManyRangeType.string,
        );
      query.andWhere(new Brackets(findManyStringRangesWhereFactory));
    }

    if (dtoFindMany.booleans) {
      const findManyBooleansWhereFactory = utilGetFindManyBooleansWhereFactory(
        query,
        dtoFindMany.booleans,
      );
      query.andWhere(new Brackets(findManyBooleansWhereFactory));
    }
  }

  // TODO: add unit tests for these eagerly fetched relations leftJoinAndSelect
  eagerFetchRelations.forEach((relationName) => {
    query.leftJoinAndSelect(
      `${query.alias}.${relationName as string}`,
      `${relationName as string}EagerFetchRelation`,
    );
  });

  return query;
}
