import { Entity, ReducerData } from './reducers.types';

export type NormalizeEntityDtoArrayResponse<EntityT extends Entity> = {
  reducerData: ReducerData<EntityT>;
  entityPksSorted: string[];
};
