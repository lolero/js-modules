import type { AxiosResponse } from 'axios';
import type { FindManyResponse } from '@js-modules/api-nest-utils/src/types/types.requests';
import type { LogEntriesDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/logEntries/dtos/logEntries.dto';

export type NodeLogEntriesCreateOneServiceResponse =
  AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesGetOneServiceResponse = AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesGetManyServiceResponse = AxiosResponse<
  FindManyResponse<LogEntriesDto>
>;

export type NodeLogEntriesUpdateOneWholeServiceResponse =
  AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesUpdateOnePartialServiceResponse =
  AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesUpdateManyPartialWithPatternServiceResponse =
  AxiosResponse<LogEntriesDto[]>;

export type NodeLogEntriesDeleteOneServiceResponse = AxiosResponse<void>;

export type NodeLogEntriesDeleteManyServiceResponse = AxiosResponse<void>;
