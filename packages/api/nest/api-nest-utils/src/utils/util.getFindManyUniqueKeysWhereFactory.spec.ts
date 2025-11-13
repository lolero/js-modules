import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { RequestEntity, FindManyUniqueKeysDto } from '../types/types.requests';
import { utilGetFindManyUniqueKeysWhereFactory } from './util.getFindManyUniqueKeysWhereFactory';

interface TestEntity extends RequestEntity {
  uniqueKeyName1: number;
  uniqueKeyNAME2: string;
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
      uniqueKeyNAME2: ['test_unique_key_value_1', 'test_unique_key_value_2'],
    };

    const whereFactory = utilGetFindManyUniqueKeysWhereFactory(
      selectQueryBuilderMock,
      findManyUniqueKeysDto,
    );
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.unique_key_name1 IN (:...uniqueKeyName1)`,
      {
        uniqueKeyName1: findManyUniqueKeysDto.uniqueKeyName1!,
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.unique_key_NAME2 IN (:...uniqueKeyNAME2)`,
      {
        uniqueKeyNAME2: findManyUniqueKeysDto.uniqueKeyNAME2!,
      },
    );
  });
});
