import { In, SelectQueryBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import {
  FindManyRelationsDto,
  FindManyUniqueKeysDto,
  RequestEntity,
} from '../types/types.requests';
import { utilApplyFindManyRelationsFiltersToQuery } from './util.applyFindManyRelationsFiltersToQuery';

type RelationEntity1 = RequestEntity & {
  uniqueKeyNumber1: string;
  uniqueKeyString1: string;
};

type RelationEntity2 = RequestEntity & {
  uniqueKeyNumber2: string;
  uniqueKeyString2: string;
};

type TestEntity = RequestEntity & {
  relation1?: RelationEntity1;
  relation2?: RelationEntity2;
};

class TestFindManyRelationsDto implements FindManyRelationsDto<TestEntity> {
  relation1: FindManyUniqueKeysDto<RelationEntity1>;

  relation2: FindManyUniqueKeysDto<RelationEntity2>;
}

describe('utilApplyFindManyRelationsFiltersToQuery', () => {
  const queryAlias = 'entity';
  let findManyRelationsDto: TestFindManyRelationsDto;

  let queryBuilderInnerJoinMock: jest.Mock;
  let queryBuilderWhereMock: jest.Mock;
  let queryBuilderOrWhereMock: jest.Mock;
  let queryBuilderMock: Partial<SelectQueryBuilder<TestEntity>>;

  beforeEach(() => {
    queryBuilderMock = {
      alias: queryAlias,
      innerJoin: jest.fn(),
      where: jest.fn(),
      orWhere: jest.fn(),
    };
    queryBuilderInnerJoinMock = jest.fn().mockReturnValue(queryBuilderMock);
    queryBuilderWhereMock = jest.fn().mockReturnValue(queryBuilderMock);
    queryBuilderOrWhereMock = jest.fn().mockReturnValue(queryBuilderMock);
    Object.assign(queryBuilderMock, {
      innerJoin: queryBuilderInnerJoinMock,
      where: queryBuilderWhereMock,
      orWhere: queryBuilderOrWhereMock,
    });
  });

  it("Should call the passed query builder innerJoin, where, and orWhere methods to join the corresponding relations tables and filter the query by the passed relations' unique keys", () => {
    findManyRelationsDto = {
      relation1: {
        uniqueKeyNumber1: [11, 22],
        uniqueKeyString1: [
          'test_unique_key_string_11',
          'test_unique_key_string_12',
        ],
      },
      relation2: {
        uniqueKeyNumber2: [21, 22],
        uniqueKeyString2: [
          'test_unique_key_string_21',
          'test_unique_key_string_22',
        ],
      },
    };

    utilApplyFindManyRelationsFiltersToQuery(
      queryBuilderMock as SelectQueryBuilder<TestEntity>,
      findManyRelationsDto,
    );

    expect(queryBuilderInnerJoinMock).toHaveBeenNthCalledWith(
      1,
      `${queryAlias}.relation1`,
      'relation1Individual',
    );
    expect(queryBuilderInnerJoinMock).toHaveBeenNthCalledWith(
      2,
      `${queryAlias}.relation2`,
      'relation2Individual',
    );
    expect(queryBuilderWhereMock).toHaveBeenNthCalledWith(
      1,
      `relation1Individual.${snakeCase(
        'uniqueKeyNumber1',
      )} = :uniqueKeyNumber1`,
      {
        uniqueKeyNumber1: In(findManyRelationsDto.relation1.uniqueKeyNumber1!),
      },
    );
    expect(queryBuilderOrWhereMock).toHaveBeenNthCalledWith(
      1,
      `relation1Individual.${snakeCase(
        'uniqueKeyString1',
      )} = :uniqueKeyString1`,
      {
        uniqueKeyString1: In(findManyRelationsDto.relation1.uniqueKeyString1!),
      },
    );
    expect(queryBuilderOrWhereMock).toHaveBeenNthCalledWith(
      2,
      `relation2Individual.${snakeCase(
        'uniqueKeyNumber2',
      )} = :uniqueKeyNumber2`,
      {
        uniqueKeyNumber2: In(findManyRelationsDto.relation2.uniqueKeyNumber2!),
      },
    );
    expect(queryBuilderOrWhereMock).toHaveBeenNthCalledWith(
      3,
      `relation2Individual.${snakeCase(
        'uniqueKeyString2',
      )} = :uniqueKeyString2`,
      {
        uniqueKeyString2: In(findManyRelationsDto.relation2.uniqueKeyString2!),
      },
    );
  });
});
