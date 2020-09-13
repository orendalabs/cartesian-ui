import {Action, createReducer, on} from "@ngrx/store";
import {
  User,
  Tenant
} from "@shared/models";
import * as sessionActions from "./session.action";


export interface SessionState {
  loading: boolean;
  loaded:  boolean;
  failed:  boolean;
  tenant: Tenant;
  user: User;
}

const INITIAL_STATE: SessionState = {
  loading: false,
  loaded: false,
  failed: false,
  tenant: new Tenant(),
  user: new User()
}

const createSessionReducers = createReducer(
  INITIAL_STATE,
  on(
    sessionActions.fetchSessionUser,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded:  false,
        failed:  false
      });
    }
  ),
  on(
    sessionActions.fetchSessionTenant,
    (state, {id}) => {
      return Object.assign({}, state, {
        loading: true,
        loaded:  false,
        failed:  false
      });
    }
  ),
  on(
    sessionActions.fetchSessionUserSuccess,
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
    sessionActions.fetchSessionTenantSuccess,
    (state,  { tenant }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        tenant: tenant
      });
    }
  ),
  on(
    sessionActions.fetchSessionUserFail,
    sessionActions.fetchSessionTenantFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed:  true });
    }
  ),
  on(
    sessionActions.setSessionUser,
    (state,  { user }) => {
      return Object.assign({}, state, { user: user });
    }
  ),
  on(
    sessionActions.setSessionTenant,
    (state,  { tenant }) => {
      return Object.assign({}, state, { tenant: tenant });
    }
  )
);


export function reducer(state: SessionState | undefined, action: Action) {
  return createSessionReducers(state, action);
}
