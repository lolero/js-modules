import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SerializeInterceptor<EntityT, DtoT extends ClassConstructor<any>>
  implements NestInterceptor
{
  constructor(private dto: DtoT) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<EntityT>,
  ): Observable<DtoT> | Promise<Observable<DtoT>> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance<DtoT, EntityT>(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Serialize<EntityT, DtoT extends ClassConstructor<any>>(
  dto: DtoT,
) {
  return UseInterceptors(new SerializeInterceptor<EntityT, DtoT>(dto));
}
