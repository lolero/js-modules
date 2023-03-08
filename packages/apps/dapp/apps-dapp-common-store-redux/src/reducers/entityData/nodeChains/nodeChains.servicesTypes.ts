import { AxiosResponse } from 'axios';
import { NodeChainRaw } from './nodeChains.types';

export interface NodeChainsGetManyServiceResponse extends AxiosResponse {
  data: NodeChainRaw[];
}

export interface NodeChainsGetIconMetadataServiceResponse
  extends AxiosResponse {
  data: {
    url: string;
    width: number;
    height: number;
    format: string;
  }[];
}
