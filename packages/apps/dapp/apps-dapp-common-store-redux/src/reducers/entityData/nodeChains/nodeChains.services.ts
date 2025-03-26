import { axiosRequest } from '@js-modules/common-utils-general';
import {
  NodeChainsGetIconMetadataServiceResponse,
  NodeChainsGetManyServiceResponse,
} from './nodeChains.services.types';

export async function nodeChainsGetManyService(): Promise<NodeChainsGetManyServiceResponse> {
  const res = await axiosRequest.get('https://chainid.network/chains.json');
  return res;
}

export async function nodeChainsGetIconMetadataService(
  iconName: string,
): Promise<NodeChainsGetIconMetadataServiceResponse> {
  const res = await axiosRequest.get(
    `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/icons/${iconName}.json`,
  );
  return res;
}
