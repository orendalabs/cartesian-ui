/* tslint:disable:max-line-length */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { UserState } from './user.state';
import { userFeatureKey } from './user.reducer';
import { AuthorizationState } from '@app/authorization/store/auth.state';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getUserLoading: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.detail.loading
);

export const getUserLoaded: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.detail.loaded
);

export const getUserFailed: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.detail.failed
);

export const getUserDetail: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.detail.data
);

export const getProfile: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.detail.data
);

export const getUsersLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(getUserState, (state: UserState) => state.listing.loading);

export const getUsersLoaded: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.listing.loaded
);

export const getUsersFailed: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.listing.failed
);

export const getUsersList: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.listing.data.data
);

export const getUsersMeta: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.listing.data.meta
);

export const getRolesFetchData: MemoizedSelector<
  object,
  object
> = createSelector(
  getUserState,
  (state: UserState) => state.roleListing.data.data
);
