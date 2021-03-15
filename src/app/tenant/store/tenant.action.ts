import { createAction, props } from '@ngrx/store';
import { Tenant } from '../models/domain';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';
import { SearchTenantForm, TenantCreateForm, TenantUpdateForm } from '../models/form';

/**
 * Fetch Tenants Actions
 */
export const doFetchTenants = createAction(
  type('[Tenant] Do Fetch Tenants'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchTenantsSuccess = createAction(
  type('[Tenant] Do Fetch Tenants Success'),
  props<{ tenants: Tenant[] }>()
);
export const doFetchTenantsFail = createAction(
  type('[Tenant] Do Fetch Tenants Fail')
);

/**
 * Fetch Tenant Actions
 */
export const doFetchTenant = createAction(
  type('[Tenant] Do Fetch Tenant'),
  props<{ id: string }>()
);
export const doFetchTenantSuccess = createAction(
  type('[Tenant] Do Fetch Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const doFetchTenantFail = createAction(type('[Tenant] Do Fetch Tenant Fail'));

/**
 * Create Tenant Actions
 */
export const doCreateTenant = createAction(
  type('[Tenant] Do Create Tenant'),
  props<{ form: TenantCreateForm }>()
);
export const doCreateTenantSuccess = createAction(
  type('[Tenant] Do Create Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const doCreateTenantFail = createAction(
  type('[Tenant] Do Create Tenant Fail')
);

/**
 * Update Tenant Actions
 */
export const doUpdateTenant = createAction(
  type('[Tenant] Do Update Tenant'),
  props<{ id: string; form: TenantUpdateForm }>()
);
export const doUpdateTenantSuccess = createAction(
  type('[Tenant] Do Update Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const doUpdateTenantFail = createAction(
  type('[Tenant] Do Update Tenant Fail')
);

/**
 * Delete Tenant Actions
 */
export const doDeleteTenant = createAction(
  type('[Tenant] Do Delete Tenant'),
  props<{ id: string }>()
);
export const doDeleteTenantSuccess = createAction(
  type('[Tenant] Do Delete Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const doDeleteTenantFail = createAction(
  type('[Tenant] Do Delete Tenant Fail')
);
