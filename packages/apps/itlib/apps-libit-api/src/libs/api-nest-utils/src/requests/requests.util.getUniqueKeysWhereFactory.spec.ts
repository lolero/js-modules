import { In, WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { requestsUtilGetUniqueKeysWhereFactory } from './requests.util.getUniqueKeysWhereFactory';

type FindManyUniqueKeysDto = {
  uniqueKeyName1?: number[];
  uniqueKeyName2?: string[];
};

describe('requestsUtilGetUniqueKeysWhereFactory', () => {
  const uniqueKeyName1 = 'uniqueKeyName1';
  const uniqueKeyName2 = 'uniqueKeyName2';

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
    const findManyUniqueKeysDto: FindManyUniqueKeysDto = {
      [uniqueKeyName1]: [1, 2],
      [uniqueKeyName2]: ['test_unique_key_value_1', 'test_unique_key_value_2'],
    };

    const whereFactory = requestsUtilGetUniqueKeysWhereFactory(
      findManyUniqueKeysDto,
    );
    whereFactory(whereExpressionBuilder);

    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase(uniqueKeyName1)} = :${uniqueKeyName1}`,
      {
        [uniqueKeyName1]: In(findManyUniqueKeysDto[uniqueKeyName1]),
      },
    );
    expect(orWhereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase(uniqueKeyName2)} = :${uniqueKeyName2}`,
      {
        [uniqueKeyName2]: In(findManyUniqueKeysDto[uniqueKeyName2]),
      },
    );
  });
});
