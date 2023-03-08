import pick from 'lodash/pick';
import * as stateAuthActionsCreators from './stateAuth.actionsCreators';
import * as stateAuthHooks from './stateAuth.hooks';
import * as stateAuthInitialState from './stateAuth.initialState';
import * as stateAuthReducer from './stateAuth.reducer';
import * as stateAuthReducerPath from './stateAuth.reducerPath';
import * as stateAuthSagas from './stateAuth.sagas';
import * as stateAuthSelectors from './stateAuth.selectors';

export * from './stateAuth.actionsTypes';
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

export default {
  ...stateAuthActionsCreators,
  ...stateAuthHooks,
  ...stateAuthInitialState,
  ...stateAuthReducer,
  ...stateAuthReducerPath,
  ...stateAuthSagas,
  ...stateAuthSelectors,
};
