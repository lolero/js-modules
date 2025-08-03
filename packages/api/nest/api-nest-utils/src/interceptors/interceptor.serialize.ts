import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { FindManyResponse } from '../types/types.requests';

type Dto = ClassConstructor<any>;

class Serialize<EntityT> implements NestInterceptor {
  constructor(private dto: Dto) {}

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
          const findManyResponse = dto as FindManyResponse<EntityT>;
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
