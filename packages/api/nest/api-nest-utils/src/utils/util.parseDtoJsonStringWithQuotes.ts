import { TransformFnParams } from 'class-transformer/types/interfaces/metadata/transform-fn-params.interface';
import isString from 'lodash/isString';
import { last } from 'lodash';

export function utilParseDtoJsonStringWithQuotes<DtoObjectT>({
  value,
}: TransformFnParams): DtoObjectT {
  if (!isString(value)) {
    return value;
  }

  try {
    let cleanValue = value;
    if (['"', "'"].includes(value[0])) {
      cleanValue = cleanValue.slice(1);
    }
    if (['"', "'"].includes(last(value) as string)) {
      cleanValue = cleanValue.slice(0, -1);
    }

    return JSON.parse(cleanValue);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}
