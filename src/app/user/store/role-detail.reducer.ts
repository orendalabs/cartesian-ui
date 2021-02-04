import { RoleDetailState } from '@app/authorization/store/auth.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from './user.action'

const INITIAL_STATE: RoleDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createRoleReducers = createReducer(
  INITIAL_STATE,
  on(
    userActions.doSyncRoles,
    (state) =>
      Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      })
  ),
  on(
    userActions.doSyncRolesSuccess,
    (state) =>
      Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
      })
  ),
  on(
    userActions.doSyncRolesFail,
    (state) =>
      Object.assign({}, INITIAL_STATE, {
        failed: true,
      })
  )
);

export const reducer = (state: RoleDetailState | undefined, action: Action) => {
  return createRoleReducers(state, action);
};
