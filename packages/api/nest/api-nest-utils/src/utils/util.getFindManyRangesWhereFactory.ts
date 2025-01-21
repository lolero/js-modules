import { WhereExpressionBuilder, SelectQueryBuilder } from 'typeorm';
import keys from 'lodash/keys';
import snakeCase from 'lodash/snakeCase';
import { utilGetFindManyDateRange } from './util.getFindManyDateRange';
import { utilGetFindManyNumberRange } from './util.getFindManyNumberRange';
import { utilGetFindManyStringRange } from './util.getFindManyStringRange';
import {
  FindManyRange,
  FindManyRangesDto,
  RequestEntity,
} from '../types/types.requests';

export enum FindManyRangeType {
  date = 'date',
  number = 'number',
  string = 'string',
}

export function utilGetFindManyRangesWhereFactory<
  EntityT extends RequestEntity,
>(
  query: SelectQueryBuilder<EntityT>,
  findManyRangesDto: FindManyRangesDto<EntityT>,
  rangeType: FindManyRangeType,
): (whereExpressionBuilder: WhereExpressionBuilder) => void {
  const rangeNames = keys(findManyRangesDto);

  const whereFactory = (whereExpressionBuilder: WhereExpressionBuilder) => {
    rangeNames.forEach((rangeName, rangeNameIndex) => {
      const rangeDto: FindManyRange =
        findManyRangesDto[rangeName as keyof EntityT]!;
      let range: [number | string | Date, number | string | Date];
      switch (rangeType) {
        case FindManyRangeType.date:
          range = utilGetFindManyDateRange(...rangeDto);
          break;
        case FindManyRangeType.number:
          range = utilGetFindManyNumberRange(...rangeDto);
          break;
        case FindManyRangeType.string:
          range = utilGetFindManyStringRange(...rangeDto);
          break;
        default:
          throw new Error('unknown range type!');
      }

      const [rangeFrom, rangeTo] = range;
      const whereStrFrom = `${query.alias}.${snakeCase(
        rangeName,
      )} >= :${rangeName}From`;
      const whereParamsFrom = {
        [`${rangeName}From`]: rangeFrom,
      };
      const whereStrTo = `${query.alias}.${snakeCase(
        rangeName,
      )} <= :${rangeName}To`;
      const whereParamsTo = {
        [`${rangeName}To`]: rangeTo,
      };

      if (rangeNameIndex === 0) {
        whereExpressionBuilder.where(whereStrFrom, whereParamsFrom);
        whereExpressionBuilder.andWhere(whereStrTo, whereParamsTo);
      } else {
        whereExpressionBuilder.andWhere(whereStrFrom, whereParamsFrom);
        whereExpressionBuilder.andWhere(whereStrTo, whereParamsTo);
      }
    });
  };

  return whereFactory;
}
