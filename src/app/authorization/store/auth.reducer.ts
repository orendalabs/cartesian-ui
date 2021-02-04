import { ActionReducerMap } from '@ngrx/store';
import { reducer as roleListingReducer } from './role-listing.reducer';
import { reducer as roleDetailReducer } from './role-detail.reducer';
import { reducer as permissionListingReducer } from './permission-listing.reducer';
import { reducer as permissionDetailReducer } from './permission-detail.reducer';
import { AuthorizationState } from './auth.state';

export const authFeatureKey = 'authorization';

export const authReducers: ActionReducerMap<AuthorizationState> = {
  roleListing: roleListingReducer,
  roleDetail: roleDetailReducer,
  permissionListing: permissionListingReducer,
  permissionDetail: permissionDetailReducer,
};
