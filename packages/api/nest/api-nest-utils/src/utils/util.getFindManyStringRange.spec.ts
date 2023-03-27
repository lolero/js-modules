import { utilGetFindManyStringRange } from './util.getFindManyStringRange';

describe('utilsGetFindManyStringRange', () => {
  it('Should return a when null is passed as from value', () => {
    const [stringFrom] = utilGetFindManyStringRange(null, 'b');

    expect(stringFrom).toBe('a');
  });

  it('Should return z when null is passed as to value', () => {
    const [, stringTo] = utilGetFindManyStringRange('b', null);

    expect(stringTo).toBe('z');
  });

  it('Should handle number ranges', () => {
    const stringRange = utilGetFindManyStringRange(1, 10);

    expect(stringRange).toEqual(['1', '10']);
  });

  it('Should handle string ranges', () => {
    const stringRange = utilGetFindManyStringRange('b', 'c');

    expect(stringRange).toEqual(['b', 'c']);
  });

  it('Should handle reversed values', () => {
    const stringRange = utilGetFindManyStringRange('c', 'b');

    expect(stringRange).toEqual(['b', 'c']);
  });
});
