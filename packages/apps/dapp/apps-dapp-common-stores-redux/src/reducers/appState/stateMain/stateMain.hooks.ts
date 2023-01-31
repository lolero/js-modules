import { useSelector } from 'react-redux';
import { Request, RequestMetadata } from 'normalized-reducers-utils';
import { selectNodeChainsRequests } from '../../entityData/nodeChains/nodeChains.selectors';
import { selectStateMainMetadata } from './stateMain.selectors';

export function useGetNodeChainsRequest():
  | Request<RequestMetadata>
  | undefined {
  const nodeChainsRequests = useSelector(selectNodeChainsRequests);
  const { getNodeChainsRequestId } = useSelector(selectStateMainMetadata);
  const getNodeChainsRequest = nodeChainsRequests[getNodeChainsRequestId || ''];

  return getNodeChainsRequest;
}
