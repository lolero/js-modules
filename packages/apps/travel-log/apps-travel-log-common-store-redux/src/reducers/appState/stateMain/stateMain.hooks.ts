import { useSelector } from 'react-redux';
import {
  Request,
  RequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
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
