import { RoleListingState } from '@app/authorization/store/auth.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from './user.action';

const INITIAL_STATE: RoleListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createRoleReducers = createReducer(
  INITIAL_STATE,
  on(
    userActions.doFetchRoles,
    userActions.doSyncRoles,
    (state) =>
    Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false,
    })
  ),
  on(
    userActions.doFetchRolesSuccess,
    (state, { roles }) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: roles,
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
    userActions.doFetchRolesFail,
    userActions.doSyncRolesFail,
    (state) =>
    Object.assign({}, INITIAL_STATE, {
      failed: true,
    })
  )
);

export const reducer = (
  state: RoleListingState | undefined,
  action: Action
) => {
  return createRoleReducers(state, action);
};
