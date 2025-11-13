import { plainToInstance } from 'class-transformer';

class EmptyDto {}

export function utilCreateFindManyDtoFieldInstance<DtoObjectT>(
  dtoObject: DtoObjectT,
  DtoClass?: { new (): DtoObjectT },
): DtoObjectT {
  const instance: DtoObjectT = plainToInstance(
    DtoClass ?? (EmptyDto as { new (): DtoObjectT }),
    dtoObject,
  );
  return instance;
}
