import uniq from 'lodash/uniq';
import type { SagaGenerator } from 'typed-redux-saga';
import { all, call, put, takeLatest } from 'typed-redux-saga';
import {
  createNodeChainsGetManyFailAction,
  createNodeChainsGetManySuccessAction,
} from './nodeChains.actions.creators';
import type { NodeChainsGetManyRequestAction } from './nodeChains.actions.types';
import { NodeChainsActionTypes } from './nodeChains.actions.types';
import { normalizeNodeChainsRawArray } from './nodeChains.normalizer';
import {
  nodeChainsGetIconMetadataService,
  nodeChainsGetManyService,
} from './nodeChains.services';

export function* nodeChainsGetManySaga({
  requestId,
}: NodeChainsGetManyRequestAction): SagaGenerator<void> {
  try {
    const { data: nodeChainsRawArray, status: statusCode } = yield* call(
      nodeChainsGetManyService,
    );

    const iconNames = uniq(
      nodeChainsRawArray
        .filter((nodeChainRaw) => nodeChainRaw.icon)
        .map((nodeChainRaw) => nodeChainRaw.icon || ''),
    );

    const iconMetadataResponses = yield* all(
      iconNames.map((iconName) =>
        call(nodeChainsGetIconMetadataService, iconName),
      ),
    );

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

    const normalizedNodeChains = yield* call(
      normalizeNodeChainsRawArray,
      nodeChainsRawArray,
      iconUrls,
    );

    yield* put(
      createNodeChainsGetManySuccessAction(
        normalizedNodeChains,
        requestId,
        statusCode,
        true,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message);
    yield* put(createNodeChainsGetManyFailAction(message, requestId));
  }
}

export function* nodeChainsSagas(): SagaGenerator<void> {
  yield* all([
    takeLatest(
      NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST,
      nodeChainsGetManySaga,
    ),
  ]);
}
