import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { FindManyBooleansDto, RequestEntity } from '../types/types.requests';
import { utilGetFindManyBooleansWhereFactory } from './util.getFindManyBooleansWhereFactory';

interface TestEntity extends RequestEntity {
  booleanProp1: boolean;
  booleanProp2: boolean;
}

describe('utilGetFindManyBooleansWhereFactory', () => {
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

  it('Should call whereExpressionBuilder.where and whereExpressionBuilder.orWhere with the corresponding booleans', () => {
    const findManyBooleansDto: FindManyBooleansDto<TestEntity> = {
      booleanProp1: true,
      booleanProp2: false,
    };

    const whereFactory = utilGetFindManyBooleansWhereFactory(
      selectQueryBuilderMock,
      findManyBooleansDto,
    );
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.${snakeCase(
        'booleanProp1',
      )} = :booleanProp1`,
      {
        booleanProp1: 1,
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.${snakeCase(
        'booleanProp2',
      )} = :booleanProp2`,
      {
        booleanProp2: 0,
      },
    );
  });
});
