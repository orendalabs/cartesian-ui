import { createAction, props } from '@ngrx/store';
import { RequestCriteria, type } from '@cartesian-ui/ng-axis';
import { ManagePermissionForm } from '../models/manage/permission.model';
import { SearchPermissionForm } from '../models/form/search-permission.model';
import { Permission } from '../models/permission.model';

/**
 * Fetch Permission Actions
 */
export const doFetchPermission = createAction(
    type('[Auth] Do Fetch Permission'),
    props<{ id: string }>()
);
export const doFetchPermissionSuccess = createAction(
    type('[Auth] Do Fetch Permission Success'),
    props<{ permission: Permission }>()
);
export const doFetchPermissionFail = createAction(
    type('[Auth] Do Fetch Permission Fail'),
    props<{ error: any }>()
);

/**
 * Fetch Permissions Actions
 */
export const doFetchPermissions = createAction(
    type('[Auth] Do Fetch Permissions'),
    props<{ requestCriteria: RequestCriteria<SearchPermissionForm> }>()
);
export const doFetchPermissionsSuccess = createAction(
    type('[Auth] Do Fetch Permissions Success'),
    props<{ permissions: Permission[] }>()
);
export const doFetchPermissionsFail = createAction(
    type('[Auth] Do Fetch Permissions Fail'),
    props<{ error: any }>()
);

/**
 * Attach Permission Actions
 */
export const doAttachPermission = createAction(
    type('[Auth] Do Attach Permission'),
    props<{ permForm: ManagePermissionForm }>()
)
export const doAttachPermissionSuccess = createAction(
    type('[Auth] Do Attach Permission Success')
)
export const doAttachPermissionFail = createAction(
    type('[Auth] Do Attach Permission Fail'),
    props<{ error: any }>()
)

/**
 * Detach Permission Actions
 */
export const doDetachPermission = createAction(
    type('[Auth] Do Detach Permission'),
    props<{ permForm: ManagePermissionForm }>()
)
export const doDetachPermissionSuccess = createAction(
    type('[Auth] Do Detach Permission Success')
)
export const doDetachPermissionFail = createAction(
    type('[Auth] Do Detach Permission Fail'),
    props<{ error: any }>()
)

/**
 * Sync Permission Actions
 */
export const doSyncPermissions = createAction(
    type('[Auth] Do Sync Permissions'),
    props<{ permForm: ManagePermissionForm }>()
)
export const doSyncPermissionsSuccess = createAction(
    type('[Auth] Do Sync Permissions Success')
)
export const doSyncPermissionsFail = createAction(
    type('[Auth] Do Sync Permissions Fail'),
    props<{ error: any }>()
)