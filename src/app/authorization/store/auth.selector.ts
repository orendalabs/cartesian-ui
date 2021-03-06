import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { authFeatureKey } from './auth.reducer';
import { AuthorizationState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthorizationState>(
  authFeatureKey
);

export const getRoleFetchData: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleDetail.data
);

export const getRoleLoaded: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleDetail.loaded
);

export const getRoleLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleDetail.loading
);

export const getRoleFailed: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleDetail.failed
);

export const getRolesFetchData: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleListing.data.data
);

export const getRolesFetchMeta: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleListing.data.meta
);

export const getRolesLoaded: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleListing.loaded
);

export const getRolesLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleListing.loading
);

export const getRolesFailed: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.roleListing.failed
);

export const getPermissionFetchData: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionDetail.data
);


export const getPermissionLoaded: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionDetail.loaded
);

export const getPermissionLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionDetail.loading
);


export const getPermissionFailed: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionDetail.failed
);

export const getPermissionsFetchData: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionListing.data.data
);

export const getPermissionsFetchMeta: MemoizedSelector<
  object,
  object
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionListing.data.meta
);


export const getPermissionsLoaded: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionListing.loaded
);

export const getPermissionsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionListing.loading
);


export const getPermissionsFailed: MemoizedSelector<
  object,
  boolean
> = createSelector(
  getAuthState,
  (state: AuthorizationState) => state.permissionListing.failed
);
