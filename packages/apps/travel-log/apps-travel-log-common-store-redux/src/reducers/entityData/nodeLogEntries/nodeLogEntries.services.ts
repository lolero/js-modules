import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
} from '@js-modules/apps-travel-log-common-constants';
import { LogEntriesCreateOneDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.createOne.dto';
import {
  NodeLogEntriesCreateOneServiceResponse,
  NodeLogEntriesGetManyServiceResponse,
  NodeLogEntriesGetOneServiceResponse,
} from './nodeLogEntries.servicesTypes';
import {
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesGetOneRequestAction,
} from './nodeLogEntries.actionsTypes';

export async function nodeLogEntriesCreateOneService(
  nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['nodeLogEntry'],
): Promise<NodeLogEntriesCreateOneServiceResponse> {
  const logEntriesCreateOneDto: LogEntriesCreateOneDto = {
    title: nodeLogEntry.title,
    description: nodeLogEntry.description,
  };

  const res = await axiosRequest.post(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}`,
    logEntriesCreateOneDto,
  );
  return res;
}

export async function nodeLogEntriesGetOneService(
  uniqueKeyValue: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'],
): Promise<NodeLogEntriesGetOneServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}/${uniqueKeyValue}?uniqueKeyName=${uniqueKeyName}`,
  );
  return res;
}

export async function nodeLogEntriesGetManyService(): Promise<NodeLogEntriesGetManyServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.usersPublic}`,
  );
  return res;
}
