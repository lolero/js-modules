import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import type { ClassConstructor } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import type { FindManyResponse } from '../types/types.requests';

// @typescript-eslint/no-explicit-any disabled because the specific entity
// type being serialized is irrelevant for the serializer function and it needs
// to be able to take any Entity regardless of its type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dto = ClassConstructor<any>;

class Serialize<EntityT> implements NestInterceptor {
  constructor(private readonly dto: Dto) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<EntityT | EntityT[] | FindManyResponse<EntityT>>,
  ):
    | Observable<Dto | Dto[] | FindManyResponse<Dto>>
    | Promise<Observable<Dto | Dto[] | FindManyResponse<Dto>>> {
    return next.handle().pipe(
      // tap((data) => {
      //   console.log('➡️ Interceptor received data:', data);
      // }),
      map((dto) => {
        if (
          dto &&
          typeof dto === 'object' &&
          'entities' in dto &&
          'total' in dto
        ) {
          const findManyResponse = dto;
          return {
            entities: plainToInstance<Dto, EntityT>(
              this.dto,
              findManyResponse.entities,
              {
                excludeExtraneousValues: true,
              },
            ),
            total: findManyResponse.total,
          };
        }

        return plainToInstance<Dto, EntityT>(this.dto, dto as EntityT, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function InterceptorSerialize<EntityT>(dto: Dto) {
  return UseInterceptors(new Serialize<EntityT>(dto));
}
