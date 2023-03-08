import pick from 'lodash/pick';
import * as stateAuthActionsCreators from './stateAuth.actionsCreators';
import * as stateAuthHooks from './stateAuth.hooks';
import * as stateAuthInitialState from './stateAuth.initialState';
import * as stateAuthSelectors from './stateAuth.selectors';

export * from './stateAuth.actionsTypes';
export * from './stateAuth.actionsCreators';
export * from './stateAuth.hooks';
export * from './stateAuth.initialState';
export * from './stateAuth.reducer';
export * from './stateAuth.reducerPath';
export * from './stateAuth.sagas';
export * from './stateAuth.selectors';
export * from './stateAuth.types';

export const stateAuthExports = {
  ...pick(stateAuthActionsCreators, [
    'createStateAuthUpdatePartialReducerMetadataRequestAction',
    'createStateAuthLoginRequestAction',
    'createStateAuthLogoutRequestAction',
  ]),
  ...stateAuthHooks,
  ...stateAuthInitialState,
  ...stateAuthSelectors,
};
