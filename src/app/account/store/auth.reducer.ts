import {AuthToken, User} from '@shared/models';
import * as fromAuthActions  from './auth.action';
import {Action, createReducer, on} from "@ngrx/store";

export interface AuthState {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  authenticated: { status: boolean, token: AuthToken};
  user:    User;
};

const INITIAL_STATE: AuthState = {
  loading:       false,
  loaded:        false,
  failed:        false,
  authenticated: { status: false, token: new AuthToken()},
  user:          new User()
};

const createAuthReducers = createReducer(
  INITIAL_STATE,
  on(
    fromAuthActions.doLoginAction,
    fromAuthActions.doRegisterAction,
    fromAuthActions.doLogoutAction,
    fromAuthActions.fetchUserAction,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded:  false,
        failed:  false
      });
    }
  ),
  on(
    fromAuthActions.doLoginSuccessAction,
    (state, { authToken}) => {
      return Object.assign({}, state, {
        loaded:  true,
        loading: false,
        failed:  false,
        authenticated: { status: true, token: authToken }
      });
    }
  ),
  on(
    fromAuthActions.fetchUserSuccessAction,
    fromAuthActions.doRegisterSuccessAction,
    (state,  {user}) => {
      return Object.assign({}, state, {
        loaded:  true,
        loading: false,
        failed:  false,
        user:    user
      });
    }
  ),
  on(
    fromAuthActions.doLogoutSuccessAction,
    (state) => {
      return Object.assign({}, state, INITIAL_STATE);
    }
  ),
  on(
    fromAuthActions.fetchUserFailAction,
    fromAuthActions.doLoginFailAction,
    fromAuthActions.doLogoutFailAction,
    fromAuthActions.doRegisterFailAction,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed:  true });
    }
  ),
  on(
    fromAuthActions.addUserAction,
    (state,  { user }) => {
      return Object.assign({}, state, { user: user });
    }
  ),
  on(
    fromAuthActions.addAuthTokenAction,
    (state,  { authToken }) => {
      return Object.assign({}, state, { token: authToken });
    }
  ),
);


export function reducer(state: AuthState | undefined, action: Action) {
  return createAuthReducers(state, action);
}
