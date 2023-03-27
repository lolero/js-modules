import { WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { RequestEntity } from '../types/types.requests';
import { DtoFindManySearch } from '../dtos/dto.findManySearch';
import { utilGetFindManySearchWhereFactory } from './util.getFindManySearchWhereFactory';

interface TestEntity extends RequestEntity {
  id: number;
  propString1: string;
  propString2: string;
}

describe('utilGetFindManySearchWhereFactory', () => {
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
      entityPropNames: ['propString1', 'propString2'],
    };

    const whereFactory = utilGetFindManySearchWhereFactory(findManySearchDto);
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propString1')} = :propString1`,
      {
        propString1: findManySearchDto.searchStr,
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propString2')} = :propString2`,
      {
        propString2: findManySearchDto.searchStr,
      },
    );
  });
});
