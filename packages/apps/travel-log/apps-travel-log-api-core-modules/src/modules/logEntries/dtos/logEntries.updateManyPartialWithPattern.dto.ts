import { DtoUpdateManyPartialWithPattern } from '@js-modules/api-nest-utils';
import { LogEntriesUpdateOnePartialDto } from './logEntries.updateOnePartial.dto';

export class LogEntriesUpdateManyPartialWithPatternDto extends DtoUpdateManyPartialWithPattern<LogEntriesUpdateOnePartialDto> {}
