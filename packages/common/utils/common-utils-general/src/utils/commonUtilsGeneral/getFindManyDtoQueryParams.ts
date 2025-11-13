import entries from 'lodash/entries';

export function getFindManyDtoQueryParams(
  findManyDto: object,
): URLSearchParams {
  const queryParams = new URLSearchParams();
  entries(findManyDto).forEach(([findManyDtoKey, findManyQueryParamObject]) => {
    const findManyQueryParamJson = JSON.stringify(findManyQueryParamObject);
    queryParams.set(findManyDtoKey, findManyQueryParamJson);
  });

  return queryParams;
}
