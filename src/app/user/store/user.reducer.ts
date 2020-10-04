import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models';
import * as fromUserActions from './user.action';

export interface UserState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  users: User[];
}

const INITIAL_STATE: UserState = {
  loading: false,
  loaded: false,
  failed: false,
  users: [],
};

const createUserReducers = createReducer(
  INITIAL_STATE,
  on(
    fromUserActions.doAuthenticateAction,
    fromUserActions.fetchAuthenticatedTenant,
    fromUserActions.fetchAuthenticatedUser,
    fromUserActions.doRegisterAction,
    fromUserActions.doLogoutAction,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(fromUserActions.doAuthenticateSuccessAction, (state, { authToken }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      authenticated: { status: true, token: authToken },
    });
  }),
  on(fromUserActions.doRegisterSuccessAction, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(fromUserActions.fetchAuthenticatedTenantSuccess, (state, { tenant }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      tenant,
    });
  }),
  on(fromUserActions.fetchAuthenticatedUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(fromUserActions.addAuthenticatedUserAction, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user,
    });
  }),
  on(fromUserActions.addAuthenticatedTenantAction, (state, { tenant }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      tenant,
    });
  }),
  on(fromUserActions.doLogoutSuccessAction, (state) => {
    return Object.assign({}, state, INITIAL_STATE);
  }),
  on(
    fromUserActions.doAuthenticateFailAction,
    fromUserActions.fetchAuthenticatedUserFail,
    fromUserActions.fetchAuthenticatedTenantFail,
    fromUserActions.doLogoutFailAction,
    fromUserActions.doRegisterFailAction,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  ),
  on(fromUserActions.addAuthTokenAction, (state, { authToken }) => {
    return Object.assign({}, state, { token: authToken });
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return createUserReducers(state, action);
}
