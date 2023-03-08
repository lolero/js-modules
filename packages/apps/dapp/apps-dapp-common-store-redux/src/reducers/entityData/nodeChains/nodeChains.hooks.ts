import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { NodeChain } from './nodeChains.types';
import { selectNodeChainsData } from './nodeChains.selectors';

export function useNodeChain(nodeChainPk: string): NodeChain | undefined {
  const nodeChains = useSelector(selectNodeChainsData);
  const nodeChain = useMemo(
    () => nodeChains[nodeChainPk],
    [nodeChainPk, nodeChains],
  );

  return nodeChain;
}
