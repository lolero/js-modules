import { PartialType } from '@nestjs/swagger';
import { LogEntriesUpdateOneWholeDto } from './logEntries.updateOneWhole.dto';

export class LogEntriesUpdateOnePartialDto extends PartialType(
  LogEntriesUpdateOneWholeDto,
) {}
