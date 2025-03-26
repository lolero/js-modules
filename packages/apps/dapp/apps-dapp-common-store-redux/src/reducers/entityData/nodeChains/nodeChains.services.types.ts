import { AxiosResponse } from 'axios';
import { NodeChainRaw } from './nodeChains.types';

export type NodeChainsGetManyServiceResponse = AxiosResponse<NodeChainRaw[]>;

export type NodeChainsGetIconMetadataServiceResponse = AxiosResponse<
  {
    url: string;
    width: number;
    height: number;
    format: string;
  }[]
>;
