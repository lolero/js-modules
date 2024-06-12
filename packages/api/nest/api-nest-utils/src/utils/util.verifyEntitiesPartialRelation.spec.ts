import { RequestEntity } from '../types/types.requests';
import { utilVerifyEntitiesPartialRelation } from './util.verifyEntitiesPartialRelation';

interface Relation extends RequestEntity {
  uniqueKeyNumber: number;
  propString: string;
  propBoolean: boolean;
}

interface Entity extends RequestEntity {
  uniqueKeyNumber: number;
  propString: string;
  propRelation: Relation;
}

describe('utilVerifyEntitiesPartialRelation', () => {
  let entities: Entity[];
  const relationKey: keyof Entity = 'propRelation';
  let partialRelation: Partial<Relation>;

  beforeEach(() => {
    const relation: Relation = {
      uniqueKeyNumber: 1,
      propString: 'propString',
      propBoolean: true,
    };

    entities = [
      {
        uniqueKeyNumber: 1,
        propString: 'propString1',
        propRelation: { ...relation },
      },
      {
        uniqueKeyNumber: 2,
        propString: 'propString2',
        propRelation: { ...relation },
      },
      {
        uniqueKeyNumber: 3,
        propString: 'propString3',
        propRelation: { ...relation },
      },
    ];

    partialRelation = {
      uniqueKeyNumber: 1,
      propString: 'propString',
    };
  });

  it("Should not throw an error if all entities' relation match partial relation", () => {
    expect(() =>
      utilVerifyEntitiesPartialRelation(entities, relationKey, partialRelation),
    ).not.toThrow();
  });

  it("Should throw an error if one entity's relation does not match partial relation", () => {
    partialRelation.propBoolean = true;
    entities[0].propRelation.propBoolean = false;

    expect(() =>
      utilVerifyEntitiesPartialRelation(entities, relationKey, partialRelation),
    ).toThrow();
  });
});
