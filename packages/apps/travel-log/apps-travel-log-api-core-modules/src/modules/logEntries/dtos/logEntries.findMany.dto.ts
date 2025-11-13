import { utilCreateFindManyDto } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';
import { LogEntriesFindManyUniqueKeysDto } from './logEntries.findManyUniqueKeys.dto';
import { LogEntriesFindManyRangesDateDto } from './logEntries.findManyRangesDate.dto';
import { LogEntriesFindManyRangesNumberDto } from './logEntries.findManyRangesNumber.dto';
import { LogEntriesFindManyRangesStringDto } from './logEntries.findManyRangesString.dto';
import { LogEntriesFindManySearchDto } from './logEntries.findManySearch.dto';
import { LogEntriesFindManyRelationsDto } from './logEntries.findManyRelations.dto';

export class LogEntriesFindManyDto extends utilCreateFindManyDto(
  LogEntriesEntity,
  LogEntriesFindManyUniqueKeysDto,
  LogEntriesFindManySearchDto,
  LogEntriesFindManyRelationsDto,
  LogEntriesFindManyRangesDateDto,
  LogEntriesFindManyRangesNumberDto,
  LogEntriesFindManyRangesStringDto,
) {}
