import difference from 'lodash/difference';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import sortedUniq from 'lodash/sortedUniq';
import { isEqual } from 'lodash';
import { RequestEntity } from '../types/types.requests';

export function utilCrossCheckIds<EntityT extends RequestEntity>(
  requestedIds: number[],
  foundEntities: EntityT[],
): void {
  const sortedUniqRequestedIds = sortedUniq(requestedIds);
  if (sortedUniqRequestedIds.length < requestedIds.length) {
    throw new BadRequestException('request error. duplicate ids.');
  }

  const foundIds = foundEntities.map((entity) => entity.id);
  const sortedUniqFoundIds = sortedUniq(foundIds);
  if (sortedUniqFoundIds.length < foundIds.length) {
    throw new InternalServerErrorException('duplicate entities found');
  }

  if (!isEqual(sortedUniqRequestedIds, sortedUniqFoundIds)) {
    const missingRequestedIds = difference(
      sortedUniqRequestedIds,
      sortedUniqFoundIds,
    );
    if (missingRequestedIds.length) {
      throw new NotFoundException(
        `entities not found. missing ids: ${missingRequestedIds.join(', ')}`,
      );
    }

    const wronglyFoundIds = difference(
      sortedUniqFoundIds,
      sortedUniqRequestedIds,
    );
    if (wronglyFoundIds.length) {
      throw new InternalServerErrorException(
        'error finding requested entities',
      );
    }
  }
}
