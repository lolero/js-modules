import { utilGetFindManyNumberRange } from './util.getFindManyNumberRange';

describe('utilsGetFindManyNumberRange', () => {
  it('Should return -Infinity when null is passed as from value', () => {
    const [numberFrom] = utilGetFindManyNumberRange(null, 10);

    expect(numberFrom).toBe(-Infinity);
  });

  it('Should return Infinity when null is passed as to value', () => {
    const [, numberTo] = utilGetFindManyNumberRange(-10, null);

    expect(numberTo).toBe(+Infinity);
  });

  it('Should handle number ranges', () => {
    const numberRange = utilGetFindManyNumberRange(-10, 10);

    expect(numberRange).toEqual([-10, 10]);
  });

  it('Should handle valid string ranges', () => {
    const numberRange = utilGetFindManyNumberRange('1', '10');

    expect(numberRange).toEqual([1, 10]);
  });

  it('Should handle invalid string ranges', () => {
    const numberRange = utilGetFindManyNumberRange('a', 'b');

    expect(numberRange).toEqual([-Infinity, Infinity]);
  });

  it('Should handle reversed values', () => {
    const numberRange = utilGetFindManyNumberRange(10, -10);

    expect(numberRange).toEqual([-10, 10]);
  });
});
