import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest as jestGlobals,
} from '@jest/globals';
import type { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import type { FindManyRangesDto, RequestEntity } from '../types/types.requests';
import { utilGetFindManyDateRange } from './util.getFindManyDateRange';
import { utilGetFindManyNumberRange } from './util.getFindManyNumberRange';
import {
  FindManyRangeType,
  utilGetFindManyRangesWhereFactory,
} from './util.getFindManyRangesWhereFactory';
import { utilGetFindManyStringRange } from './util.getFindManyStringRange';

jest.mock('../utils/util.getFindManyDateRange');
jest.mock('../utils/util.getFindManyNumberRange');
jest.mock('../utils/util.getFindManyStringRange');

interface TestEntity extends RequestEntity {
  uniqueKeyNumber1: number;
  propNumber1: number;
  propNUMBER2: number;
  propString1: string;
  propSTRING2: string;
  propDate1: Date;
  propDATE2: Date;
}

describe('utilGetFindManyRangesWhereFactory', () => {
  const selectQueryBuilderMock = {
    alias: 'test_alias',
  } as SelectQueryBuilder<TestEntity>;

  const utilGetFindManyDateRangeMockReturnValue: [Date, Date] = [
    new Date('2000-01-01'),
    new Date('2020-02-01'),
  ];
  const utilGetFindManyDateRangeMock = jestGlobals.mocked(
    utilGetFindManyDateRange,
  );
  const utilGetFindManyNumberRangeMockReturnValue: [number, number] = [1, 10];
  const utilGetFindManyNumberRangeMock = jestGlobals.mocked(
    utilGetFindManyNumberRange,
  );
  const utilGetFindManyStringRangeMockReturnValue: [string, string] = [
    'a',
    'd',
  ];
  const utilGetFindManyStringRangeMock = jestGlobals.mocked(
    utilGetFindManyStringRange,
  );

  let whereMock: jestGlobals.Mock;
  let andWhereMock: jestGlobals.Mock;
  let whereExpressionBuilder: WhereExpressionBuilder;

  beforeEach(() => {
    utilGetFindManyDateRangeMock.mockReturnValue(
      utilGetFindManyDateRangeMockReturnValue,
    );
    utilGetFindManyNumberRangeMock.mockReturnValue(
      utilGetFindManyNumberRangeMockReturnValue,
    );
    utilGetFindManyStringRangeMock.mockReturnValue(
      utilGetFindManyStringRangeMockReturnValue,
    );
    whereMock = jestGlobals.fn();
    andWhereMock = jestGlobals.fn();
    whereExpressionBuilder = {
      where: whereMock,
      andWhere: andWhereMock,
    } as unknown as WhereExpressionBuilder;
  });

  afterEach(() => {
    utilGetFindManyDateRangeMock.mockRestore();
    utilGetFindManyNumberRangeMock.mockRestore();
    utilGetFindManyStringRangeMock.mockRestore();
  });

  it('Should call utilGetFindManyDateRange with the passed ranges and whereExpressionBuilder.where and whereExpressionBuilder.andWhere with the corresponding date ranges', () => {
    const findManyDateRangesDto: FindManyRangesDto<TestEntity> = {
      propDate1: [null, '2000-01-01'],
      propDATE2: ['2000-01-01', '2001-01-01'],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      selectQueryBuilderMock,
      findManyDateRangesDto,
      FindManyRangeType.date,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyDateRangeMockReturnValue;
    expect(utilGetFindManyDateRangeMock).toHaveBeenNthCalledWith(
      1,
      findManyDateRangesDto.propDate1![0],
      findManyDateRangesDto.propDate1![1],
    );
    expect(utilGetFindManyDateRangeMock).toHaveBeenNthCalledWith(
      2,
      findManyDateRangesDto.propDATE2![0],
      findManyDateRangesDto.propDATE2![1],
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_date1 >= :propDate1From`,
      {
        propDate1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_date1 <= :propDate1To`,
      {
        propDate1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${selectQueryBuilderMock.alias}.prop_DATE2 >= :propDATE2From`,
      {
        propDATE2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${selectQueryBuilderMock.alias}.prop_DATE2 <= :propDATE2To`,
      {
        propDATE2To: rangeTo,
      },
    );
  });

  it('Should call utilGetFindManyNumberRange with the passed ranges and whereExpressionBuilder.where and whereExpressionBuilder.andWhere with the corresponding number ranges', () => {
    const findManyNumberRangesDto: FindManyRangesDto<TestEntity> = {
      propNumber1: [null, 100],
      propNUMBER2: [-100, 100],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      selectQueryBuilderMock,
      findManyNumberRangesDto,
      FindManyRangeType.number,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyNumberRangeMockReturnValue;
    expect(utilGetFindManyNumberRangeMock).toHaveBeenNthCalledWith(
      1,
      findManyNumberRangesDto.propNumber1![0],
      findManyNumberRangesDto.propNumber1![1],
    );
    expect(utilGetFindManyNumberRangeMock).toHaveBeenNthCalledWith(
      2,
      findManyNumberRangesDto.propNUMBER2![0],
      findManyNumberRangesDto.propNUMBER2![1],
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_number1 >= :propNumber1From`,
      {
        propNumber1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_number1 <= :propNumber1To`,
      {
        propNumber1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${selectQueryBuilderMock.alias}.prop_NUMBER2 >= :propNUMBER2From`,
      {
        propNUMBER2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${selectQueryBuilderMock.alias}.prop_NUMBER2 <= :propNUMBER2To`,
      {
        propNUMBER2To: rangeTo,
      },
    );
  });

  it('Should call utilGetFindManyStringRange with the passed ranges and whereExpressionBuilder.where and whereExpressionBuilder.andWhere with the corresponding string ranges', () => {
    const findManyStringRangesDto: FindManyRangesDto<TestEntity> = {
      propString1: [null, 'f'],
      propSTRING2: ['a', 'h'],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      selectQueryBuilderMock,
      findManyStringRangesDto,
      FindManyRangeType.string,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyStringRangeMockReturnValue;
    expect(utilGetFindManyStringRange).toHaveBeenNthCalledWith(
      1,
      findManyStringRangesDto.propString1![0],
      findManyStringRangesDto.propString1![1],
    );
    expect(utilGetFindManyStringRange).toHaveBeenNthCalledWith(
      2,
      findManyStringRangesDto.propSTRING2![0],
      findManyStringRangesDto.propSTRING2![1],
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_string1 >= :propString1From`,
      {
        propString1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${selectQueryBuilderMock.alias}.prop_string1 <= :propString1To`,
      {
        propString1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${selectQueryBuilderMock.alias}.prop_STRING2 >= :propSTRING2From`,
      {
        propSTRING2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${selectQueryBuilderMock.alias}.prop_STRING2 <= :propSTRING2To`,
      {
        propSTRING2To: rangeTo,
      },
    );
  });
});
