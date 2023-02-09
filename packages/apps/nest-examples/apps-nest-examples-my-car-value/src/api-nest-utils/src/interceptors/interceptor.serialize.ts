import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

type Dto = ClassConstructor<any>;

class InterceptorSerialize<EntityT> implements NestInterceptor {
  constructor(private dto: Dto) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<EntityT>,
  ): Observable<Dto> | Promise<Observable<Dto>> {
    return next.handle().pipe(
      map((entity) => {
        return plainToInstance<Dto, EntityT>(this.dto, entity, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function Serialize<EntityT>(dto: Dto) {
  return UseInterceptors(new InterceptorSerialize<EntityT>(dto));
}
