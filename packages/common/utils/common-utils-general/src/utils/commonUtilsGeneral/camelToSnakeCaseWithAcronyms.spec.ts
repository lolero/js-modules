import { camelToSnakeCaseWithAcronyms } from './camelToSnakeCaseWithAcronyms';

describe('camelToSnakeCaseWithUpperCaseAcronyms', () => {
  it('should convert camelCase to snake_case', () => {
    expect(camelToSnakeCaseWithAcronyms('camelCaseString')).toBe(
      'camel_case_string',
    );
  });

  it('should keep numbers attached to string parts', () => {
    expect(camelToSnakeCaseWithAcronyms('camelCaseString1')).toBe(
      'camel_case_string1',
    );
  });

  it('should preserve upper case acronyms at the beginning', () => {
    expect(camelToSnakeCaseWithAcronyms('CAMELCaseString')).toBe(
      'CAMEL_case_string',
    );
    expect(camelToSnakeCaseWithAcronyms('CAMELCase')).toBe('CAMEL_case');
  });

  it('should preserve upper case acronyms in the middle', () => {
    expect(camelToSnakeCaseWithAcronyms('camelCASEString')).toBe(
      'camel_CASE_string',
    );
  });

  it('should preserve upper case acronyms at the end', () => {
    expect(camelToSnakeCaseWithAcronyms('camelCaseSTRING')).toBe(
      'camel_case_STRING',
    );
    expect(camelToSnakeCaseWithAcronyms('camelCASE')).toBe('camel_CASE');
  });
});
