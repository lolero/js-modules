import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';
import isString from 'lodash/isString';
import { utilParseDtoStringJsonWithQuotes } from './util.parseDtoStringJsonWithQuotes';
import { utilCreateFindManyDtoFieldInstance } from './util.createFindManyDtoFieldInstance';

export function utilTransformFindManyDtoField<DtoObjectT>(
  params: TransformFnParams,
  DtoClass?: { new (): DtoObjectT },
) {
  if (!params.value || !isString(params.value)) {
    return params.value;
  }

  const dtoObject = utilParseDtoStringJsonWithQuotes<DtoObjectT>(params.value);
  const dtoClass = utilCreateFindManyDtoFieldInstance<DtoObjectT>(
    dtoObject,
    DtoClass,
  );
  return dtoClass;
}
