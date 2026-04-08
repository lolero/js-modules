import { describe, expect, it } from '@jest/globals';
import { utilParseDtoStringJsonWithQuotes } from './util.parseDtoStringJsonWithQuotes';

describe('utilParseDtoStringJsonWithQuotes', () => {
  it('Should return parsed json for string without quotes', () => {
    const dto = {
      key: 'value',
    };
    const dtoJson = JSON.stringify(dto, null, 2);
    const dtoJsonParsed = utilParseDtoStringJsonWithQuotes(dtoJson);
    expect(dtoJsonParsed).toEqual(dto);
  });

  it('Should return parsed json for string with single quotes', () => {
    const dto = {
      key: 'value',
    };
    const dtoJson = JSON.stringify(dto, null, 2);
    const dtoJsonWithQuotes = `'${dtoJson}'`;
    const dtoJsonParsed = utilParseDtoStringJsonWithQuotes(dtoJsonWithQuotes);
    expect(dtoJsonParsed).toEqual(dto);
  });

  it('Should return parsed json for string with double quotes', () => {
    const dto = {
      key: 'value',
    };
    const dtoJson = JSON.stringify(dto, null, 2);
    const dtoJsonWithQuotes = `"${dtoJson}"`;
    const dtoJsonParsed = utilParseDtoStringJsonWithQuotes(dtoJsonWithQuotes);
    expect(dtoJsonParsed).toEqual(dto);
  });

  it('Should throw error for invalid json', () => {
    const dto = {
      key: 'value',
    };
    const dtoJson = JSON.stringify(dto, null, 2);
    const dtoJsonInvalid = `${dtoJson}}`;
    expect(() => utilParseDtoStringJsonWithQuotes(dtoJsonInvalid)).toThrow();
  });
});
