import { ActionReducerMap } from '@ngrx/store';
import { TenantState } from './tenant.state';
import { reducer as listingReducer } from './tenant-listing.reducer';
import { reducer as detailReducer } from './tenant-detail.reducer';

export const tenantFeatureKey = `tenant`;

export const tenantReducers: ActionReducerMap<TenantState> = {
  listing: listingReducer,
  detail: detailReducer,
};
