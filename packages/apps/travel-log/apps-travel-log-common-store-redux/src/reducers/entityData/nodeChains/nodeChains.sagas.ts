import {
  all,
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import { uniq } from 'lodash';
import { NodeChainsReducer } from './nodeChains.types';
import {
  NodeChainsActionTypes,
  NodeChainsGetManyRequestAction,
} from './nodeChains.actionsTypes';
import {
  createNodeChainsGetManyFailAction,
  createNodeChainsGetManySuccessAction,
} from './nodeChains.actionsCreators';
import {
  NodeChainsGetIconMetadataServiceResponse,
  NodeChainsGetManyServiceResponse,
} from './nodeChains.servicesTypes';
import {
  nodeChainsGetIconMetadataService,
  nodeChainsGetManyService,
} from './nodeChains.services';
import { normalizeNodeChainsRawArray } from './nodeChains.normalizer';

export function* nodeChainsGetManySaga({
  requestId,
}: NodeChainsGetManyRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  | NodeChainsGetManyServiceResponse
  | NodeChainsGetIconMetadataServiceResponse[]
  | NodeChainsReducer['data']
> {
  try {
    const { data: nodeChainsRawArray, status: statusCode } = (yield call(
      nodeChainsGetManyService,
    )) as NodeChainsGetManyServiceResponse;

    const iconNames = uniq(
      nodeChainsRawArray
        .filter((nodeChainRaw) => nodeChainRaw.icon)
        .map((nodeChainRaw) => nodeChainRaw.icon || ''),
    );

    const iconMetadataResponses = (yield all(
      iconNames.map((iconName) =>
        call(nodeChainsGetIconMetadataService, iconName),
      ),
    )) as NodeChainsGetIconMetadataServiceResponse[];

    const iconsMetadata = iconMetadataResponses.map(
      (iconMetadataResponse) => iconMetadataResponse.data[0],
    );

    const iconUrls: Record<string, string> = iconsMetadata.reduce(
      (iconUrlsTemp, iconMetadata, iconIndex) => {
        const httpUrl = iconMetadata.url.replace(
          'ipfs://',
          'https://ipfs.io/ipfs/',
        );

        const iconName = iconNames[iconIndex];

        return {
          ...iconUrlsTemp,
          [iconName]: httpUrl,
        };
      },
      {},
    );

    const normalizedNodeChains = (yield call(
      normalizeNodeChainsRawArray,
      nodeChainsRawArray,
      iconUrls,
    )) as NodeChainsReducer['data'];

    yield put(
      createNodeChainsGetManySuccessAction(
        normalizedNodeChains,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeChainsGetManyFailAction(err.message, requestId));
  }
}

export function* nodeChainsSagas(): Generator<ForkEffect, void, void> {
  yield takeLatest(
    NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST,
    nodeChainsGetManySaga,
  );
}
