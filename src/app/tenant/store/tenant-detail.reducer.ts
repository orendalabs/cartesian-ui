import { Action, createReducer, on } from '@ngrx/store';
import { TenantDetailState } from './tenant.state';
import * as tenantActions from './tenant.action';

const INITIAL_STATE: TenantDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createTenantDetailReducers = createReducer(
  INITIAL_STATE,
  on(
    tenantActions.doFetchTenant,
    tenantActions.doCreateTenant,
    tenantActions.doUpdateTenant,
    tenantActions.doDeleteTenant,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    tenantActions.doFetchTenantSuccess,
    tenantActions.doCreateTenantSuccess,
    tenantActions.doUpdateTenantSuccess,
    tenantActions.doDeleteTenantSuccess,
    (state, { tenant }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: tenant,
      });
    }
  ),
  on(
    tenantActions.doFetchTenantFail,
    tenantActions.doCreateTenantFail,
    tenantActions.doUpdateTenantFail,
    tenantActions.doDeleteTenantFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: TenantDetailState | undefined, action: Action) {
  return createTenantDetailReducers(state, action);
}
