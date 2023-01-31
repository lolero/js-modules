import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from 'normalized-reducers-utils';

export type NodeChainRaw = {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoUrl: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: {
    registry: string;
  };
  explorers?: {
    name: string;
    url: string;
    standard: string;
  }[];
};

export interface NodeChain extends Entity {
  id: number;
  code: string;
  name: string;
  iconUrl: string;
  __edges__: {
    nativeToken: [string];
  };
}

export const nodeChainsPkSchema: PkSchema<NodeChain, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_chains_sep_',
  subSeparator: '_node_chains_sub_sep_',
};

type NodeChainsReducerMetadata = ReducerMetadata;

export type NodeChainsReducer = Reducer<NodeChainsReducerMetadata, NodeChain>;
