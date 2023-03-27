import { Brackets, SelectQueryBuilder } from 'typeorm';
import noop from 'lodash/noop';
import { BadRequestException } from '@nestjs/common';
import { utilApplyFindManyFiltersToQuery } from './util.applyFindManyFiltersToQuery';
import { DtoFindMany } from '../dtos/dto.findMany';
import { RequestEntity } from '../types/types.requests';
import { utilGetFindManyUniqueKeysWhereFactory } from './util.getFindManyUniqueKeysWhereFactory';
import { utilGetFindManySearchWhereFactory } from './util.getFindManySearchWhereFactory';
import {
  FindManyRangeType,
  utilGetFindManyRangesWhereFactory,
} from './util.getFindManyRangesWhereFactory';
import { utilApplyFindManyRelationsFiltersToQuery } from './util.applyFindManyRelationsFiltersToQuery';

jest.mock('./util.applyFindManyRelationsFiltersToQuery');
jest.mock('./util.getFindManyUniqueKeysWhereFactory');
jest.mock('./util.getFindManySearchWhereFactory');
jest.mock('./util.getFindManyRangesWhereFactory');

type TestEntity = RequestEntity & {
  relation1?: RequestEntity;
};

describe('utilApplyFindManyFiltersToQuery', () => {
  let dtoFindMany: DtoFindMany<TestEntity>;

  const utilApplyFindManyRelationsFiltersToQueryMock = jest.mocked(
    utilApplyFindManyRelationsFiltersToQuery,
  );
  const utilGetFindManyUniqueKeysWhereFactoryMock = jest.mocked(
    utilGetFindManyUniqueKeysWhereFactory,
  );
  const utilGetFindManySearchWhereFactoryMock = jest.mocked(
    utilGetFindManySearchWhereFactory,
  );
  const utilGetFindManyRangesWhereFactoryMock = jest.mocked(
    utilGetFindManyRangesWhereFactory,
  );

  let queryBuilderSelectMock: jest.Mock;
  let queryBuilderWhereMock: jest.Mock;
  let queryBuilderAndWhereMock: jest.Mock;
  let queryBuilderMock: Partial<SelectQueryBuilder<TestEntity>>;

  beforeEach(() => {
    queryBuilderMock = {
      select: jest.fn(),
      where: jest.fn(),
      andWhere: jest.fn(),
    };
    queryBuilderSelectMock = jest.fn().mockReturnValue(queryBuilderMock);
    queryBuilderWhereMock = jest.fn().mockReturnValue(queryBuilderMock);
    queryBuilderAndWhereMock = jest.fn().mockReturnValue(queryBuilderMock);
    Object.assign(queryBuilderMock, {
      select: queryBuilderSelectMock,
      where: queryBuilderWhereMock,
      andWhere: queryBuilderAndWhereMock,
    });
  });

  afterEach(() => {
    utilApplyFindManyRelationsFiltersToQueryMock.mockRestore();
    utilGetFindManyUniqueKeysWhereFactoryMock.mockRestore();
    utilGetFindManySearchWhereFactoryMock.mockRestore();
    utilGetFindManyRangesWhereFactoryMock.mockRestore();
  });

  it("Should call select(*) and where('id != null') on the query", () => {
    dtoFindMany = {};

    utilApplyFindManyFiltersToQuery(
      queryBuilderMock as SelectQueryBuilder<TestEntity>,
      dtoFindMany,
    );

    expect(queryBuilderSelectMock).toHaveBeenNthCalledWith(1, '*');
    expect(queryBuilderWhereMock).toHaveBeenNthCalledWith(1, 'id != null');
  });

  describe('uniqueKeys', () => {
    const utilGetFindManyUniqueKeysWhereFactoryMockReturnValue = noop;

    it('Should call utilGetFindManyUniqueKeysWhereFactory with the passed uniqueKeys FindManyUniqueKeysDto, if it is defined and not empty, and filter the query with the resulting Brackets', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
      };
      utilGetFindManyUniqueKeysWhereFactoryMock.mockReturnValue(
        utilGetFindManyUniqueKeysWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyUniqueKeysWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        dtoFindMany.uniqueKeys,
      );
      expect(queryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(utilGetFindManyUniqueKeysWhereFactoryMockReturnValue),
      );
    });

    it('Should not call utilGetFindManyUniqueKeysWhereFactory or filter the query by the uniqueKeys FindManyUniqueKeysDto if it is not defined', () => {
      dtoFindMany = {
        uniqueKeys: undefined,
      };
      utilGetFindManyUniqueKeysWhereFactoryMock.mockReturnValue(
        utilGetFindManyUniqueKeysWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyUniqueKeysWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should not call utilGetFindManyUniqueKeysWhereFactory or filter the query by the uniqueKeys FindManyUniqueKeysDto if it is empty', () => {
      dtoFindMany = {
        uniqueKeys: {},
      };
      utilGetFindManyUniqueKeysWhereFactoryMock.mockReturnValue(
        utilGetFindManyUniqueKeysWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyUniqueKeysWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should throw an error if a non empty uniqueKeys FindManyUniqueKeysDto is passed, as well as a search DtoFindManySearch', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
        search: {
          searchStr: 'test_search',
          entityPropNames: ['id'],
        },
      };

      expect(() =>
        utilApplyFindManyFiltersToQuery(
          queryBuilderMock as SelectQueryBuilder<TestEntity>,
          dtoFindMany,
        ),
      ).toThrow(BadRequestException);
    });

    it('Should throw an error if a non empty uniqueKeys FindManyUniqueKeysDto is passed, as well as a relations FindManyRelationsDto', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
        relations: {},
      };

      expect(() =>
        utilApplyFindManyFiltersToQuery(
          queryBuilderMock as SelectQueryBuilder<TestEntity>,
          dtoFindMany,
        ),
      ).toThrow(BadRequestException);
    });

    it('Should throw an error if a non empty uniqueKeys FindManyUniqueKeysDto is passed, as well as a dateRanges FindManyDateRangesDto', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
        dateRanges: {
          createdAt: [null, null],
        },
      };

      expect(() =>
        utilApplyFindManyFiltersToQuery(
          queryBuilderMock as SelectQueryBuilder<TestEntity>,
          dtoFindMany,
        ),
      ).toThrow(BadRequestException);
    });

    it('Should throw an error if a non empty uniqueKeys FindManyUniqueKeysDto is passed, as well as numberRanges FindManyNumberRangesDto', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
        numberRanges: {
          id: [null, null],
        },
      };

      expect(() =>
        utilApplyFindManyFiltersToQuery(
          queryBuilderMock as SelectQueryBuilder<TestEntity>,
          dtoFindMany,
        ),
      ).toThrow(BadRequestException);
    });

    it('Should throw an error if a non empty uniqueKeys FindManyUniqueKeysDto is passed, as well as stringRanges FindManyStringRangesDto', () => {
      dtoFindMany = {
        uniqueKeys: {
          id: [1, 2, 3],
        },
        stringRanges: {
          id: [null, null],
        },
      };

      expect(() =>
        utilApplyFindManyFiltersToQuery(
          queryBuilderMock as SelectQueryBuilder<TestEntity>,
          dtoFindMany,
        ),
      ).toThrow(BadRequestException);
    });
  });

  describe('relations', () => {
    it('Should call utilApplyFindManyRelationsFiltersToQuery with the passed dateRelations FindManyRelationsDto, if it is defined', () => {
      dtoFindMany = {
        relations: {
          relation1: {
            id: [1, 2, 3],
          },
        },
      };

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(
        utilApplyFindManyRelationsFiltersToQueryMock,
      ).toHaveBeenNthCalledWith(1, queryBuilderMock, dtoFindMany.relations);
    });

    it('Should not call utilApplyFindManyRelationsFiltersToQuery if the dateRelations FindManyRelationsDto if it is not defined', () => {
      dtoFindMany = {
        relations: undefined,
      };

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(
        utilApplyFindManyRelationsFiltersToQueryMock,
      ).not.toHaveBeenCalled();
    });
  });

  describe('search', () => {
    const utilGetFindManySearchWhereFactoryMockReturnValue = noop;

    it('Should call utilGetFindManySearchWhereFactory with the passed search DtoFindManySearch, if it is defined, and filter the query with the resulting Brackets', () => {
      dtoFindMany = {
        search: {
          searchStr: 'test_search',
          entityPropNames: ['id'],
        },
      };
      utilGetFindManySearchWhereFactoryMock.mockReturnValue(
        utilGetFindManySearchWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManySearchWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        dtoFindMany.search,
      );
      expect(queryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(utilGetFindManySearchWhereFactoryMockReturnValue),
      );
    });

    it('Should not call utilGetFindManySearchWhereFactory or filter the search DtoFindManySearch if it is not defined', () => {
      dtoFindMany = {
        search: undefined,
      };
      utilGetFindManySearchWhereFactoryMock.mockReturnValue(
        utilGetFindManySearchWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManySearchWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });
  });

  describe('dateRanges', () => {
    const utilGetFindManyRangesWhereFactoryMockReturnValue = noop;

    it('Should call utilGetFindManyRangesWhereFactory with the passed dateRanges FindManyRangesDto, if it is defined, and filter the query with the resulting Brackets', () => {
      dtoFindMany = {
        dateRanges: {
          createdAt: [null, null],
        },
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        dtoFindMany.dateRanges,
        FindManyRangeType.date,
      );
      expect(queryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(utilGetFindManyRangesWhereFactoryMockReturnValue),
      );
    });

    it('Should not call utilGetFindManyRangesWhereFactory or filter the dateRanges FindManyRangesDto if it is not defined', () => {
      dtoFindMany = {
        dateRanges: undefined,
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });
  });

  describe('numberRanges', () => {
    const utilGetFindManyRangesWhereFactoryMockReturnValue = noop;

    it('Should call utilGetFindManyRangesWhereFactory with the passed numberRanges FindManyRangesDto, if it is defined, and filter the query with the resulting Brackets', () => {
      dtoFindMany = {
        numberRanges: {
          id: [null, null],
        },
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        dtoFindMany.numberRanges,
        FindManyRangeType.number,
      );
      expect(queryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(utilGetFindManyRangesWhereFactoryMockReturnValue),
      );
    });

    it('Should not call utilGetFindManyRangesWhereFactory or filter the numberRanges FindManyRangesDto if it is not defined', () => {
      dtoFindMany = {
        numberRanges: undefined,
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });
  });

  describe('stringRanges', () => {
    const utilGetFindManyRangesWhereFactoryMockReturnValue = noop;

    it('Should call utilGetFindManyRangesWhereFactory with the passed stringRanges FindManyRangesDto, if it is defined, and filter the query with the resulting Brackets', () => {
      dtoFindMany = {
        stringRanges: {
          id: [null, null],
        },
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        dtoFindMany.stringRanges,
        FindManyRangeType.string,
      );
      expect(queryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(utilGetFindManyRangesWhereFactoryMockReturnValue),
      );
    });

    it('Should not call utilGetFindManyRangesWhereFactory or filter the stringRanges FindManyRangesDto if it is not defined', () => {
      dtoFindMany = {
        stringRanges: undefined,
      };
      utilGetFindManyRangesWhereFactoryMock.mockReturnValue(
        utilGetFindManyRangesWhereFactoryMockReturnValue,
      );

      utilApplyFindManyFiltersToQuery(
        queryBuilderMock as SelectQueryBuilder<TestEntity>,
        dtoFindMany,
      );

      expect(utilGetFindManyRangesWhereFactoryMock).not.toHaveBeenCalled();
      expect(queryBuilderAndWhereMock).not.toHaveBeenCalled();
    });
  });
});
