import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { RequestEntity, FindManyUniqueKeysDto } from '../types/types.requests';
import { utilGetFindManyUniqueKeysWhereFactory } from './util.getFindManyUniqueKeysWhereFactory';

interface TestEntity extends RequestEntity {
  uniqueKeyNumber1: number;
  uniqueKeyName1: number;
  uniqueKeyName2: string;
}

describe('utilGetFindManyUniqueKeysWhereFactory', () => {
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

  it('Should call whereExpressionBuilder.where and whereExpressionBuilder.orWhere with the corresponding uniqueKeys', () => {
    const findManyUniqueKeysDto: FindManyUniqueKeysDto<TestEntity> = {
      uniqueKeyName1: [1, 2],
      uniqueKeyName2: ['test_unique_key_value_1', 'test_unique_key_value_2'],
    };

    const whereFactory = utilGetFindManyUniqueKeysWhereFactory(
      selectQueryBuilderMock,
      findManyUniqueKeysDto,
    );
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.${snakeCase(
        'uniqueKeyName1',
      )} IN (:...uniqueKeyName1)`,
      {
        uniqueKeyName1: findManyUniqueKeysDto.uniqueKeyName1!,
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.${snakeCase(
        'uniqueKeyName2',
      )} IN (:...uniqueKeyName2)`,
      {
        uniqueKeyName2: findManyUniqueKeysDto.uniqueKeyName2!,
      },
    );
  });
});
