import { Expose, Transform } from 'class-transformer';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesDto {
  @Expose()
  id: LogEntriesEntity['id'];

  @Expose()
  title: LogEntriesEntity['title'];

  @Expose()
  description?: LogEntriesEntity['description'];

  @Expose()
  @Transform(({ obj }: { obj: LogEntriesEntity }) => {
    return obj.user.id;
  })
  userId: number;

  @Expose()
  @Transform(({ obj }: { obj: LogEntriesEntity }) => {
    return obj.createdAt.toISOString();
  })
  createdAt: string;

  @Expose()
  @Transform(({ obj }: { obj: LogEntriesEntity }) => {
    return obj.updatedAt?.toISOString();
  })
  updatedAt?: string;

  @Expose()
  @Transform(({ obj }: { obj: LogEntriesEntity }) => {
    return obj.deletedAt?.toISOString();
  })
  deletedAt?: string;
}
