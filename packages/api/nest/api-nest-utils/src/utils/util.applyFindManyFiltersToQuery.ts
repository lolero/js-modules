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

export function utilApplyFindManyFiltersToQuery<EntityT extends RequestEntity>(
  query: SelectQueryBuilder<EntityT>,
  dtoFindMany: DtoFindMany<EntityT>,
): SelectQueryBuilder<EntityT> {
  query.select('*').where('id != null');

  if (dtoFindMany.uniqueKeys && !isEmpty(dtoFindMany.uniqueKeys)) {
    if (
      dtoFindMany.search ||
      dtoFindMany.relations ||
      dtoFindMany.dateRanges ||
      dtoFindMany.numberRanges ||
      dtoFindMany.stringRanges
    ) {
      throw new BadRequestException(
        'filtering by unique keys is only supported on its own and cannot be combined with search, relations, dateRanges, numberRanges, or stringRanges',
      );
    }

    const findManyUniqueKeysWhereFactory =
      utilGetFindManyUniqueKeysWhereFactory(dtoFindMany.uniqueKeys);
    query.andWhere(new Brackets(findManyUniqueKeysWhereFactory));
  } else {
    if (dtoFindMany.search) {
      const findManySearchWhereFactory = utilGetFindManySearchWhereFactory(
        dtoFindMany.search,
      );
      query.andWhere(new Brackets(findManySearchWhereFactory));
    }

    if (dtoFindMany.relations) {
      utilApplyFindManyRelationsFiltersToQuery(query, dtoFindMany.relations);
    }

    if (dtoFindMany.dateRanges) {
      const findManyDateRangesWhereFactory = utilGetFindManyRangesWhereFactory(
        dtoFindMany.dateRanges,
        FindManyRangeType.date,
      );
      query.andWhere(new Brackets(findManyDateRangesWhereFactory));
    }

    if (dtoFindMany.numberRanges) {
      const findManyNumberRangesWhereFactory =
        utilGetFindManyRangesWhereFactory(
          dtoFindMany.numberRanges,
          FindManyRangeType.number,
        );
      query.andWhere(new Brackets(findManyNumberRangesWhereFactory));
    }

    if (dtoFindMany.stringRanges) {
      const findManyStringRangesWhereFactory =
        utilGetFindManyRangesWhereFactory(
          dtoFindMany.stringRanges,
          FindManyRangeType.string,
        );
      query.andWhere(new Brackets(findManyStringRangesWhereFactory));
    }
  }

  return query;
}
