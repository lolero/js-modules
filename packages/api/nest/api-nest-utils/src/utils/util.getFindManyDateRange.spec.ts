import { utilGetFindManyDateRange } from './util.getFindManyDateRange';

describe('utilsGetFindManyDateRange', () => {
  it('Should return a Date object initialized with 1970-01-01T00:00:00.000Z when null is passed as from value', () => {
    const [dateFrom] = utilGetFindManyDateRange(null, '2000-01-01');

    expect(dateFrom.toISOString()).toBe('1970-01-01T00:00:00.000Z');
  });

  it('Should return a Date object initialized with +275760-09-13T00:00:00.000Z when null is passed as to value', () => {
    const [, dateTo] = utilGetFindManyDateRange('2000-01-01', null);

    expect(dateTo.toISOString()).toBe('+275760-09-13T00:00:00.000Z');
  });

  it('Should handle unix milliseconds integer values', () => {
    const [dateFrom, dateTo] = utilGetFindManyDateRange(
      946684800000,
      978307200000,
    );

    expect(dateFrom.toISOString()).toBe('2000-01-01T00:00:00.000Z');
    expect(dateTo.toISOString()).toBe('2001-01-01T00:00:00.000Z');
  });

  it('Should handle timestamp string values', () => {
    const [dateFrom, dateTo] = utilGetFindManyDateRange(
      '2000-01-01',
      '2001-01-01',
    );

    expect(dateFrom.toISOString()).toBe('2000-01-01T00:00:00.000Z');
    expect(dateTo.toISOString()).toBe('2001-01-01T00:00:00.000Z');
  });

  it('Should handle reversed values', () => {
    const [dateFrom, dateTo] = utilGetFindManyDateRange(
      '2001-01-01',
      '2000-01-01',
    );

    expect(dateFrom.toISOString()).toBe('2000-01-01T00:00:00.000Z');
    expect(dateTo.toISOString()).toBe('2001-01-01T00:00:00.000Z');
  });
});
