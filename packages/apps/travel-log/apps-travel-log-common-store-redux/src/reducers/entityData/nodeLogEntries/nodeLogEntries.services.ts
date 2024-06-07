import { axiosRequest } from '@js-modules/common-utils-general';
import {
  API_CORE_URI_TRAVEL_LOG,
  ApiControllersTravelLog,
} from '@js-modules/apps-travel-log-common-constants';
import { LogEntriesCreateOneDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.createOne.dto';
import { LogEntriesUpdateManyPartialWithPatternDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.updateManyPartialWithPattern.dto';
import { destructNodeLogEntryPk } from './nodeLogEntries.pkUtils';
import {
  NodeLogEntriesGetManyRequestAction,
  NodeLogEntriesUpdateManyPartialWithPatternRequestAction,
  NodeLogEntriesUpdateOneWholeRequestAction,
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesGetOneRequestAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
  NodeLogEntriesDeleteOneRequestAction,
  NodeLogEntriesDeleteManyRequestAction,
} from './nodeLogEntries.actions.types';
import {
  NodeLogEntriesCreateOneServiceResponse,
  NodeLogEntriesDeleteManyServiceResponse,
  NodeLogEntriesDeleteOneServiceResponse,
  NodeLogEntriesGetManyServiceResponse,
  NodeLogEntriesGetOneServiceResponse,
  NodeLogEntriesUpdateManyPartialWithPatternServiceResponse,
  NodeLogEntriesUpdateOnePartialServiceResponse,
  NodeLogEntriesUpdateOneWholeServiceResponse,
} from './nodeLogEntries.services.types';

export async function nodeLogEntriesCreateOneService(
  entity: NodeLogEntriesCreateOneRequestAction['requestMetadata']['entity'],
): Promise<NodeLogEntriesCreateOneServiceResponse> {
  const logEntriesCreateOneDto: LogEntriesCreateOneDto = {
    title: entity.title,
    description: entity.description,
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
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/${uniqueKeyValue}?uniqueKeyName=${uniqueKeyName}`,
  );
  return res;
}

export async function nodeLogEntriesGetManyService(
  findManyDto: NodeLogEntriesGetManyRequestAction['requestMetadata']['findManyDto'],
): Promise<NodeLogEntriesGetManyServiceResponse> {
  const res = await axiosRequest.get(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}`,
    { params: { findManyDto } },
  );
  return res;
}

export async function nodeLogEntriesUpdateOneWholeService(
  entity: NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']['entity'],
): Promise<NodeLogEntriesUpdateOneWholeServiceResponse> {
  const res = await axiosRequest.patch(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/${entity.id}`,
  );
  return res;
}

export async function nodeLogEntriesUpdateOnePartialService(
  entityPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['entityPk'],
  partialEntity: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['partialEntity'],
): Promise<NodeLogEntriesUpdateOnePartialServiceResponse> {
  const logEntryId = destructNodeLogEntryPk(entityPk).fields.id;

  const res = await axiosRequest.patch(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/${logEntryId}`,
    partialEntity,
  );
  return res;
}

export async function nodeLogEntriesUpdateManyPartialWithPatternService(
  entityPks: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['entityPks'],
  partialEntity: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['partialEntity'],
): Promise<NodeLogEntriesUpdateManyPartialWithPatternServiceResponse> {
  const ids = entityPks.map((entityPk) =>
    Number(destructNodeLogEntryPk(entityPk).fields.id),
  );
  const logEntriesUpdateManyPartialWithPatternDto: LogEntriesUpdateManyPartialWithPatternDto =
    {
      ids,
      dtoUpdateOnePartial: partialEntity,
    };

  const res = await axiosRequest.patch(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/batch`,
    logEntriesUpdateManyPartialWithPatternDto,
  );
  return res;
}

export async function nodeLogEntriesDeleteOneService(
  entityPk: NodeLogEntriesDeleteOneRequestAction['requestMetadata']['entityPk'],
): Promise<NodeLogEntriesDeleteOneServiceResponse> {
  const logEntryId = destructNodeLogEntryPk(entityPk).fields.id;

  const res = await axiosRequest.delete(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/${logEntryId}`,
  );
  return res;
}

export async function nodeLogEntriesDeleteManyService(
  entityPks: NodeLogEntriesDeleteManyRequestAction['requestMetadata']['entityPks'],
): Promise<NodeLogEntriesDeleteManyServiceResponse> {
  const logEntryIds = entityPks.map(
    (entityPk) => destructNodeLogEntryPk(entityPk).fields.id,
  );

  const res = await axiosRequest.delete(
    `${API_CORE_URI_TRAVEL_LOG}/${ApiControllersTravelLog.logEntries}/batch`,
    {
      params: {
        ids: logEntryIds,
      },
    },
  );
  return res;
}
