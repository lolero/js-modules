import { AxiosResponse } from 'axios';
import { LogEntriesDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.dto';

export type NodeLogEntriesCreateOneServiceResponse =
  AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesGetOneServiceResponse = AxiosResponse<LogEntriesDto>;

export type NodeLogEntriesGetManyServiceResponse = AxiosResponse<
  LogEntriesDto[]
>;
