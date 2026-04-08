import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import type { DtoFindManySearch } from '../dtos/dto.findManySearch';
import type { RequestEntity } from '../types/types.requests';
import { utilGetFindManySearchWhereFactory } from './util.getFindManySearchWhereFactory';

interface TestEntity extends RequestEntity {
  uniqueKeyNumber1: number;
  propString1: string;
  propSTRING2: string;
}

describe('utilGetFindManySearchWhereFactory', () => {
  const selectQueryBuilderMock = {
    alias: 'test_alias',
  } as SelectQueryBuilder<TestEntity>;

  let whereMock: jest.Mock;
  let orWhereMock: jest.Mock;
  let whereExpressionBuilder: WhereExpressionBuilder;

  beforeEach(() => {
    whereMock = jest.fn();
    orWhereMock = jest.fn();
    whereExpressionBuilder = {
      where: whereMock,
      orWhere: orWhereMock,
    } as unknown as WhereExpressionBuilder;
  });

  it('Should call whereExpressionBuilder.where and whereExpressionBuilder.orWhere with the corresponding search filters', () => {
    const findManySearchDto: DtoFindManySearch<TestEntity> = {
      searchStr: 'test_search_str',
      entityPropNames: ['propString1', 'propSTRING2'],
    };

    const whereFactory = utilGetFindManySearchWhereFactory(
      selectQueryBuilderMock,
      findManySearchDto,
    );
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_string1 LIKE :propString1`,
      {
        propString1: `%${findManySearchDto.searchStr}%`,
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_STRING2 LIKE :propSTRING2`,
      {
        propSTRING2: `%${findManySearchDto.searchStr}%`,
      },
    );
  });
});
