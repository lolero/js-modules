/**
 * Converts a camelCase string to snake_case while preserving uppercase
 * acronyms.
 *
 * @param str - The string to convert
 * @returns The string converted to snake_case with preserved acronyms
 *
 * @example
 * snakeCaseWithAcronyms('camelCaseString') // 'camel_case_string'
 * snakeCaseWithAcronyms('camelCaseString1') // 'camel_case_string1'
 * snakeCaseWithAcronyms('CAMELCaseString') // 'CAMEL_case_string'
 * snakeCaseWithAcronyms('CAMELCase') // 'CAMEL_case'
 * snakeCaseWithAcronyms('camelCASEString') // 'camel_CASE_string'
 * snakeCaseWithAcronyms('camelCaseSTRING') // 'camel_case_STRING'
 * snakeCaseWithAcronyms('camelCASE') // 'camel_CASE'
 */
export function camelToSnakeCaseWithAcronyms(str: string): string {
  return (
    str
      // Insert underscores before uppercase letters that follow lowercase letters
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      // Insert underscores before uppercase letters that are followed by lowercase letters (end of acronym)
      .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
      // Convert only lowercase sequences to lowercase, preserve uppercase sequences
      .replace(/[A-Z]*[a-z]+/g, (match) => match.toLowerCase())
  );
}
