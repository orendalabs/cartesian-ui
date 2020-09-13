import { createAction, props } from '@ngrx/store';
import {
  User,
  Tenant
} from '@shared/models';
import { type }   from '@cartesian-ui/ng-axis';


/**
 * Tenant Actions
 */
export const fetchSessionTenant = createAction(type('[Session] Fetch Tenant'), props<{ id: string }>());
export const fetchSessionTenantSuccess = createAction(type('[Session] Fetch Tenant Success'), props<{ tenant: Tenant }>());
export const fetchSessionTenantFail = createAction(type('[Session] Fetch Tenant Fail'));
export const setSessionTenant = createAction(type('[Session] Add Tenant'), props<{ tenant: Tenant }>());
export const unsetSessionTenant = createAction(type('[Session] Remove Tenant'));


/**
 * User Actions
 */
export const fetchSessionUser = createAction(type('[Session] Fetch User'));
export const fetchSessionUserSuccess = createAction(type('[Session] Fetch User Success'), props<{ user: User }>());
export const fetchSessionUserFail = createAction(type('[Session] Fetch User Fail'));
export const setSessionUser = createAction(type('[Session] Add User'), props<{ user: User }>());
export const unsetSessionUser = createAction(type('[Session] Remove User'));
