import { utilGetDtoFindManyFixture } from '@js-modules/api-nest-utils';
import { getUsersEntityFixture } from '../users/users.utils.fixtures';
import { LogEntriesFindManyDto } from './dtos/logEntries.findMany.dto';
import { LogEntriesUpdateOnePartialDto } from './dtos/logEntries.updateOnePartial.dto';
import { LogEntriesEntity } from './logEntries.entity';
import { LogEntriesEntityType } from './logEntries.types';
import { LogEntriesFindManyUniqueKeysDto } from './dtos/logEntries.findManyUniqueKeys.dto';
import { LogEntriesFindManySearchDto } from './dtos/logEntries.findManySearch.dto';
import { LogEntriesFindManyRelationsDto } from './dtos/logEntries.findManyRelations.dto';
import { LogEntriesFindManyRangesDateDto } from './dtos/logEntries.findManyRangesDate.dto';
import { LogEntriesFindManyRangesNumberDto } from './dtos/logEntries.findManyRangesNumber.dto';
import { LogEntriesFindManyRangesStringDto } from './dtos/logEntries.findManyRangesString.dto';

export function getLogEntriesEntityFixture(
  overrides: Partial<LogEntriesEntityType> = {},
): LogEntriesEntity {
  const logEntriesEntityDefault: LogEntriesEntityType = {
    id: 1,
    title: 'test_title',
    description: 'test_description',
    user: getUsersEntityFixture(),
    createdAt: new Date('2000-01-01T00:00:00.000Z'),
    updatedAt: new Date('2000-01-01T00:00:00.000Z'),
  };

  const logEntriesEntity = Object.assign(logEntriesEntityDefault, overrides);

  return logEntriesEntity as LogEntriesEntity;
}

export function getLogEntriesFindManyDtoFixture(
  overrides: Partial<LogEntriesFindManyDto> = {},
): LogEntriesFindManyDto {
  return utilGetDtoFindManyFixture<
    LogEntriesEntity,
    LogEntriesFindManyUniqueKeysDto,
    LogEntriesFindManySearchDto,
    LogEntriesFindManyRelationsDto,
    LogEntriesFindManyRangesDateDto,
    LogEntriesFindManyRangesNumberDto,
    LogEntriesFindManyRangesStringDto
  >(overrides);
}

export function getLogEntriesUpdateOnePartialDtoFixture(
  overrides: Partial<LogEntriesUpdateOnePartialDto> = {},
): LogEntriesUpdateOnePartialDto {
  return overrides;
}
