import { ActionReducerMap } from '@ngrx/store';
import { UserState } from './user.state';
import { reducer as userListingReducer } from './user-listing.reducer';
import { reducer as userDetailReducer } from './user-detail.reducer';

export const userFeatureKey = `user`;

export const userReducers: ActionReducerMap<UserState> = {
  listing: userListingReducer,
  detail: userDetailReducer,
};
