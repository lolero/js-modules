import { RequestEntity } from '../types/types.requests';
import { utilVerifyEntitiesPartialRelation } from './util.verifyEntitiesPartialRelation';

interface Relation extends RequestEntity {
  id: number;
  propString: string;
  propBoolean: boolean;
}

interface Entity extends RequestEntity {
  id: number;
  propString: string;
  propRelation: Relation;
}

describe('utilVerifyEntitiesPartialRelation', () => {
  let entities: Entity[];
  const relationKey: keyof Entity = 'propRelation';
  let partialRelation: Partial<Relation>;

  beforeEach(() => {
    const relation: Relation = {
      id: 1,
      propString: 'propString',
      propBoolean: true,
    };

    entities = [
      {
        id: 1,
        propString: 'propString1',
        propRelation: { ...relation },
      },
      {
        id: 2,
        propString: 'propString2',
        propRelation: { ...relation },
      },
      {
        id: 3,
        propString: 'propString3',
        propRelation: { ...relation },
      },
    ];

    partialRelation = {
      id: 1,
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
