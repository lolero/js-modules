import { IsOptional, IsString } from 'class-validator';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesCreateOneDto {
  @IsString()
  title: LogEntriesEntity['title'];

  @IsString()
  @IsOptional()
  description?: LogEntriesEntity['description'];
}
