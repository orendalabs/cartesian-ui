import {AuthToken, User} from '@shared/models';
import * as fromAuthActions  from './auth.action';
import {Action, createReducer, on} from "@ngrx/store";

export interface AuthState {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  authenticated: { status: boolean, token: AuthToken};
};

const INITIAL_STATE: AuthState = {
  loading:       false,
  loaded:        false,
  failed:        false,
  authenticated: { status: false, token: new AuthToken()},
};

const createAuthReducers = createReducer(
  INITIAL_STATE,
  on(
    fromAuthActions.doLoginAction,
    fromAuthActions.doRegisterAction,
    fromAuthActions.doLogoutAction,
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
    fromAuthActions.doLoginFailAction,
    fromAuthActions.doLogoutFailAction,
    fromAuthActions.doRegisterFailAction,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed:  true });
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
