import { WhereExpressionBuilder } from 'typeorm';
import snakeCase from 'lodash/snakeCase';
import { FindManyRangesDto, RequestEntity } from '../types/types.requests';
import {
  utilGetFindManyRangesWhereFactory,
  FindManyRangeType,
} from './util.getFindManyRangesWhereFactory';
import { utilGetFindManyDateRange } from './util.getFindManyDateRange';
import { utilGetFindManyNumberRange } from './util.getFindManyNumberRange';
import { utilGetFindManyStringRange } from './util.getFindManyStringRange';

jest.mock('../utils/util.getFindManyDateRange');
jest.mock('../utils/util.getFindManyNumberRange');
jest.mock('../utils/util.getFindManyStringRange');

interface TestEntity extends RequestEntity {
  id: number;
  propNumber1: number;
  propNumber2: number;
  propString1: string;
  propString2: string;
  propDate1: Date;
  propDate2: Date;
}

describe('utilGetFindManyRangesWhereFactory', () => {
  const utilGetFindManyDateRangeMockReturnValue: [Date, Date] = [
    new Date('2000-01-01'),
    new Date('2020-02-01'),
  ];
  const utilGetFindManyDateRangeMock = jest.mocked(utilGetFindManyDateRange);
  const utilGetFindManyNumberRangeMockReturnValue: [number, number] = [1, 10];
  const utilGetFindManyNumberRangeMock = jest.mocked(
    utilGetFindManyNumberRange,
  );
  const utilGetFindManyStringRangeMockReturnValue: [string, string] = [
    'a',
    'd',
  ];
  const utilGetFindManyStringRangeMock = jest.mocked(
    utilGetFindManyStringRange,
  );

  let whereMock: jest.Mock;
  let andWhereMock: jest.Mock;
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
    whereMock = jest.fn();
    andWhereMock = jest.fn();
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
      propDate2: ['2000-01-01', '2001-01-01'],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      findManyDateRangesDto,
      FindManyRangeType.date,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyDateRangeMockReturnValue;
    expect(utilGetFindManyDateRange).toHaveBeenNthCalledWith(
      1,
      findManyDateRangesDto.propDate1,
    );
    expect(utilGetFindManyDateRange).toHaveBeenNthCalledWith(
      2,
      findManyDateRangesDto.propDate2,
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propDate1')} >= :propDate1From`,
      {
        propDate1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propDate1')} <= :propDate1To`,
      {
        propDate1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${snakeCase('propDate2')} >= :propDate2From`,
      {
        propDate2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${snakeCase('propDate2')} <= :propDate2To`,
      {
        propDate2To: rangeTo,
      },
    );
  });

  it('Should call utilGetFindManyNumberRange with the passed ranges and whereExpressionBuilder.where and whereExpressionBuilder.andWhere with the corresponding number ranges', () => {
    const findManyNumberRangesDto: FindManyRangesDto<TestEntity> = {
      propNumber1: [null, 100],
      propNumber2: [-100, 100],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      findManyNumberRangesDto,
      FindManyRangeType.number,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyNumberRangeMockReturnValue;
    expect(utilGetFindManyNumberRange).toHaveBeenNthCalledWith(
      1,
      findManyNumberRangesDto.propNumber1,
    );
    expect(utilGetFindManyNumberRange).toHaveBeenNthCalledWith(
      2,
      findManyNumberRangesDto.propNumber2,
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propNumber1')} >= :propNumber1From`,
      {
        propNumber1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propNumber1')} <= :propNumber1To`,
      {
        propNumber1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${snakeCase('propNumber2')} >= :propNumber2From`,
      {
        propNumber2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${snakeCase('propNumber2')} <= :propNumber2To`,
      {
        propNumber2To: rangeTo,
      },
    );
  });

  it('Should call utilGetFindManyStringRange with the passed ranges and whereExpressionBuilder.where and whereExpressionBuilder.andWhere with the corresponding string ranges', () => {
    const findManyStringRangesDto: FindManyRangesDto<TestEntity> = {
      propString1: [null, 'f'],
      propString2: ['a', 'h'],
    };

    const whereFactory = utilGetFindManyRangesWhereFactory(
      findManyStringRangesDto,
      FindManyRangeType.string,
    );
    whereFactory(whereExpressionBuilder);

    const [rangeFrom, rangeTo] = utilGetFindManyStringRangeMockReturnValue;
    expect(utilGetFindManyStringRange).toHaveBeenNthCalledWith(
      1,
      findManyStringRangesDto.propString1,
    );
    expect(utilGetFindManyStringRange).toHaveBeenNthCalledWith(
      2,
      findManyStringRangesDto.propString2,
    );
    expect(whereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propString1')} >= :propString1From`,
      {
        propString1From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      1,
      `${snakeCase('propString1')} <= :propString1To`,
      {
        propString1To: rangeTo,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      2,
      `${snakeCase('propString2')} >= :propString2From`,
      {
        propString2From: rangeFrom,
      },
    );
    expect(andWhereMock).toHaveBeenNthCalledWith(
      3,
      `${snakeCase('propString2')} <= :propString2To`,
      {
        propString2To: rangeTo,
      },
    );
  });
});
