import { UnauthorizedException } from '@nestjs/common';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import { RequestEntity } from '../types/types.requests';

export function utilVerifyEntitiesPartialRelation<
  EntityT extends RequestEntity,
  RelationT extends RequestEntity,
>(
  entities: EntityT[],
  relationKey: keyof EntityT,
  partialRelation: Partial<RelationT>,
): void {
  const isUnauthorized = entities.some((entity) => {
    const relation = entity[relationKey] as RelationT;
    const partialRelationItem = pick(relation, keys(partialRelation));
    const isPartialRelationMatch = isEqual(
      partialRelation,
      partialRelationItem,
    );

    return !isPartialRelationMatch;
  });

  if (isUnauthorized) {
    throw new UnauthorizedException();
  }
}
