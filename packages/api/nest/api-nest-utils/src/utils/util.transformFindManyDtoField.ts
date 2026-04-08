import type { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';
import isString from 'lodash/isString';
import { utilCreateFindManyDtoFieldInstance } from './util.createFindManyDtoFieldInstance';
import { utilParseDtoStringJsonWithQuotes } from './util.parseDtoStringJsonWithQuotes';

export function utilTransformFindManyDtoField<DtoObjectT>(
  params: TransformFnParams,
  DtoClass?: { new (): DtoObjectT },
): DtoObjectT {
  if (!params.value || !isString(params.value)) {
    return params.value as DtoObjectT;
  }

  const dtoObject = utilParseDtoStringJsonWithQuotes<DtoObjectT>(params.value);
  const dtoClass = utilCreateFindManyDtoFieldInstance<DtoObjectT>(
    dtoObject,
    DtoClass,
  );
  return dtoClass;
}
