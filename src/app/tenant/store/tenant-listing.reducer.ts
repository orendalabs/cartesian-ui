import { Action, createReducer, on } from '@ngrx/store';
import { TenantListingState } from './tenant.state';
import * as actions from './tenant.action'

const INITIAL_STATE: TenantListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createTenantListingReducers = createReducer(
  INITIAL_STATE,
  on(
    actions.doFetchTenants,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    actions.doFetchTenantsSuccess,
    (state, { tenants }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: tenants,
      });
    }
  ),
  on(
    actions.doFetchTenantsFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: TenantListingState | undefined, action: Action) {
  return createTenantListingReducers(state, action);
}
