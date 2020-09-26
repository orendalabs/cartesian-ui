import { Action, createReducer, on } from '@ngrx/store';
import { AuthToken, Tenant, User } from '../models';
import * as fromAccountActions from './account.action';

export interface AccountState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  user: User;
  tenant: Tenant;
  authenticated: { status: boolean; token: AuthToken };
}

const INITIAL_STATE: AccountState = {
  loading: false,
  loaded: false,
  failed: false,
  user: new User(),
  tenant: new Tenant(),
  authenticated: { status: false, token: new AuthToken() },
};

const createAccountReducers = createReducer(
  INITIAL_STATE,
  on(
    fromAccountActions.doAuthenticateAction,
    fromAccountActions.fetchAuthenticatedTenant,
    fromAccountActions.fetchAuthenticatedUser,
    fromAccountActions.doRegisterAction,
    fromAccountActions.doLogoutAction,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(fromAccountActions.doAuthenticateSuccessAction, (state, { authToken }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      authenticated: { status: true, token: authToken },
    });
  }),
  on(fromAccountActions.doRegisterSuccessAction, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(
    fromAccountActions.fetchAuthenticatedTenantSuccess,
    (state, { tenant }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        tenant,
      });
    }
  ),
  on(fromAccountActions.fetchAuthenticatedUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(fromAccountActions.addAuthenticatedUserAction, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(fromAccountActions.addAuthenticatedTenantAction, (state, { tenant }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      tenant,
    });
  }),
  on(fromAccountActions.doLogoutSuccessAction, (state) => {
    return Object.assign({}, state, INITIAL_STATE);
  }),
  on(
    fromAccountActions.doAuthenticateFailAction,
    fromAccountActions.fetchAuthenticatedUserFail,
    fromAccountActions.fetchAuthenticatedTenantFail,
    fromAccountActions.doLogoutFailAction,
    fromAccountActions.doRegisterFailAction,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  ),
  on(fromAccountActions.addAuthTokenAction, (state, { authToken }) => {
    return Object.assign({}, state, { token: authToken });
  })
);

export function reducer(state: AccountState | undefined, action: Action) {
  return createAccountReducers(state, action);
}
