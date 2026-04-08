import { describe, expect, it } from '@jest/globals';
import { utilParseDtoStringWithQuotes } from './util.parseDtoStringWithQuotes';

describe('utilParseDtoStringWithQuotes', () => {
  it('Should return unchanged string without quotes', () => {
    const dtoString = 'value';
    const dtoStringParsed = utilParseDtoStringWithQuotes(dtoString);
    expect(dtoStringParsed).toEqual(dtoString);
  });

  it('Should return clean string without single quotes', () => {
    const dtoString = 'value';
    const dtoStringWithQuotes = `'${dtoString}'`;
    const dtoStringParsed = utilParseDtoStringWithQuotes(dtoStringWithQuotes);
    expect(dtoStringParsed).toEqual(dtoString);
  });

  it('Should return parsed json for string with double quotes', () => {
    const dtoString = 'value';
    const dtoStringWithQuotes = `"${dtoString}"`;
    const dtoStringParsed = utilParseDtoStringWithQuotes(dtoStringWithQuotes);
    expect(dtoStringParsed).toEqual(dtoString);
  });
});
