import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { authFeatureKey } from "./auth.reducer";
import { AuthorizationState } from "./auth.state";

export const getRoleState = createFeatureSelector<AuthorizationState>(authFeatureKey);

export const getRoleCreateSuccess: MemoizedSelector<object, boolean> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleDetail.loaded
)

export const getRoleCreateFail: MemoizedSelector<object, boolean> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleDetail.failed
)

export const getRoleFetchData: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleDetail.data
)

export const getRolesFetchData: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleListing.data.data
)

export const getRolesFetchMeta: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleListing.data.meta
)

export const getRoleDeleteSuccess: MemoizedSelector<object, boolean> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleDetail.loaded
)

export const getRoleDeleteFail: MemoizedSelector<object, boolean> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.roleDetail.failed
)

export const getPermissionFetchData: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.permissionDetail.data
)

export const getPermissionsFetchData: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.permissionListing.data.data
)

export const getPermissionsFetchMeta: MemoizedSelector<object, object> = createSelector(
    getRoleState,
    (state: AuthorizationState) => state.permissionListing.data.meta
)