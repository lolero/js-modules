import { NodeChain, NodeChainRaw, NodeChainsReducer } from './nodeChains.types';
import { getPkOfNodeChain } from './nodeChains.pkUtils';

export function normalizeNodeChainsRawArray(
  nodeChainsRaw: NodeChainRaw[],
  iconUrls: Record<string, string>,
): NodeChainsReducer['data'] {
  const normalizedNodeChains: NodeChainsReducer['data'] = nodeChainsRaw.reduce(
    (normalizedNodeChainsTemp: NodeChainsReducer['data'], nodeChainRaw) => {
      const nodeChain: NodeChain = {
        id: nodeChainRaw.chainId,
        code: nodeChainRaw.chain,
        name: nodeChainRaw.name,
        iconUrl: iconUrls[nodeChainRaw.icon || ''],
        __edges__: {
          nativeToken: [nodeChainRaw.nativeCurrency.symbol],
        },
      };

      return {
        ...normalizedNodeChainsTemp,
        [getPkOfNodeChain(nodeChain)]: nodeChain,
      };
    },
    {},
  );

  return normalizedNodeChains;
}
