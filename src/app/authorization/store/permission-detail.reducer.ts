import { Action, createReducer, on } from '@ngrx/store';
import * as permissionActions from './permission.action';
import { PermissionDetailState } from './auth.state';
import { Permission } from '../models/permission.model';

const INITIAL_STATE: PermissionDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createPermissionReducers = createReducer(
  INITIAL_STATE,
  on(
    permissionActions.doAttachPermission,
    permissionActions.doDetachPermission,
    permissionActions.doFetchPermission,
    permissionActions.doSyncPermissions,
    (state) =>
      Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      })
  ),
  on(
    permissionActions.doAttachPermissionSuccess,
    permissionActions.doDetachPermissionSuccess,
    permissionActions.doSyncPermissions,
    (state) =>
      Object.assign({}, state, {
        loading: false,
        loaded: true,
        failed: false,
      })
  ),
  on(
    permissionActions.doAttachPermissionFail,
    permissionActions.doDetachPermissionFail,
    permissionActions.doFetchPermissionFail,
    permissionActions.doSyncPermissions,
    (state) =>
      Object.assign({}, INITIAL_STATE, {
        failed: true,
      })
  ),
  on(permissionActions.doFetchPermissionSuccess, (state, perm) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: perm.permission,
    })
  )
);

export const reducer = (
  state: PermissionDetailState | undefined,
  action: Action
) => {
  return createPermissionReducers(state, action);
};
