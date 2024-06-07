import { LogEntriesDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.dto';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';
import { getPkOfNodeLogEntry } from './nodeLogEntries.pkUtils';
import { NodeUser } from '../nodeUsers/nodeUsers.types';
import { getPkOfNodeUser } from '../nodeUsers/nodeUsers.pkUtils';

export function normalizeLogEntriesDtoArray(
  logEntriesDtoArray: LogEntriesDto[],
): NodeLogEntriesReducer['data'] {
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

        return {
          ...normalizedNodeLogEntriesTemp,
          [getPkOfNodeLogEntry(nodeLogEntry)]: nodeLogEntry,
        };
      },
      {},
    );

  return normalizedNodeLogEntries;
}
