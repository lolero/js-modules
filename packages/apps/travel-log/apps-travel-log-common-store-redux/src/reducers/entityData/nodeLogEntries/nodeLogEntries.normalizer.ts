import type { LogEntriesDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/logEntries/dtos/logEntries.dto';
import type { NormalizeEntityDtoArrayResponse } from '@js-modules/common-redux-utils-normalized-reducers';
import { getPkOfNodeUser } from '../nodeUsers/nodeUsers.pkUtils';
import type { NodeUser } from '../nodeUsers/nodeUsers.types';
import { getPkOfNodeLogEntry } from './nodeLogEntries.pkUtils';
import type {
  NodeLogEntriesReducer,
  NodeLogEntry,
} from './nodeLogEntries.types';

export function normalizeLogEntriesDtoArray(
  logEntriesDtoArray: LogEntriesDto[],
): NormalizeEntityDtoArrayResponse<NodeLogEntry> {
  const entityPksSorted: string[] = [];
  const normalizedNodeLogEntries: NodeLogEntriesReducer['data'] =
    logEntriesDtoArray.reduce(
      (
        normalizedNodeLogEntriesTemp: NodeLogEntriesReducer['data'],
        logEntriesDto,
      ) => {
        const nodeUser: NodeUser = {
          id: logEntriesDto.userId,
          createdAt: '',
        };
        const nodeUserPk = getPkOfNodeUser(nodeUser);

        const nodeLogEntry: NodeLogEntry = {
          id: logEntriesDto.id,
          title: logEntriesDto.title,
          description: logEntriesDto.description,
          createdAt: logEntriesDto.createdAt,
          updatedAt: logEntriesDto.updatedAt,
          deletedAt: logEntriesDto.deletedAt,
          __edges__: {
            user: [nodeUserPk],
          },
        };

        const nodeLogEntryPk = getPkOfNodeLogEntry(nodeLogEntry);
        entityPksSorted.push(nodeLogEntryPk);

        return {
          ...normalizedNodeLogEntriesTemp,
          [getPkOfNodeLogEntry(nodeLogEntry)]: nodeLogEntry,
        };
      },
      {},
    );

  return {
    reducerData: normalizedNodeLogEntries,
    entityPksSorted,
  };
}
