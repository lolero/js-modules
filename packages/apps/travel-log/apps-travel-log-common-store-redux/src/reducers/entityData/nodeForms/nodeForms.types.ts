import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export type FormStep = {
  name: string;
  number: number;
  dangers: Record<string, FormDanger>;
  consequences: Record<string, FormConsequence>;
};

export type FormDanger = {
  name: string;
  checked: boolean;
};

export type FormConsequence = {};

export interface NodeForm extends Entity {
  steps: Record<string, FormStep>;
}

export const nodeFormsPkSchema: PkSchema<NodeForm, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_forms_sep_',
  subSeparator: '_node_forms_sub_sep_',
};

type NodeFormsReducerMetadata = ReducerMetadata;

export type NodeFormsReducer = Reducer<NodeFormsReducerMetadata, NodeForm>;
