import { createAction, props } from '@ngrx/store';
import {
  AuthUser,
  Tenant,
  AuthToken,
  LoginForm,
  RegisterForm,
} from '../models';
import { type } from '@cartesian-ui/ng-axis';

/**
 * Login Actions
 */
export const doAuthenticate = createAction(
  type('[Account] Do Authenticate'),
  props<{ loginForm: LoginForm }>()
);
export const doAuthenticateSuccess = createAction(
  type('[Account] Do Authenticate Success'),
  props<{ authToken: AuthToken }>()
);
export const doAuthenticateFail = createAction(
  type('[Account] Do Authenticate Fail')
);
export const doAddAuthToken = createAction(
  type('[Account] Add Auth Token'),
  props<{ authToken: AuthToken }>()
);
export const doRemoveAuthToken = createAction(
  type('[Account] Remove Auth Token'),
  props<{ authToken: AuthToken }>()
);

/**
 * Tenant Actions
 */
export const doFetchAuthenticatedTenant = createAction(
  type('[Account] Fetch Tenant'),
  props<{ id: string }>()
);
export const doFetchAuthenticatedTenantSuccess = createAction(
  type('[Account] Fetch Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const doFetchAuthenticatedTenantFail = createAction(
  type('[Account] Fetch Tenant Fail')
);
export const doAddAuthenticatedTenant = createAction(
  type('[Account] Add Tenant'),
  props<{ tenant: Tenant }>()
);
export const doRemoveAuthenticatedTenant = createAction(
  type('[Account] Remove Tenant'),
  props<{ tenant: Tenant }>()
);

/**
 * AuthUser Actions
 */
export const doFetchAuthenticatedUser = createAction(
  type('[Account] Fetch AuthUser')
);
export const doFetchAuthenticatedUserSuccess = createAction(
  type('[Account] Fetch AuthUser Success'),
  props<{ user: AuthUser }>()
);
export const doFetchAuthenticatedUserFail = createAction(
  type('[Account] Fetch AuthUser Fail')
);
export const doAddAuthenticatedUser = createAction(
  type('[Account] Add Authenticated AuthUser'),
  props<{ user: AuthUser }>()
);
export const doRemoveAuthenticatedUser = createAction(
  type('[Account] Remove Authenticated AuthUser'),
  props<{ user: AuthUser }>()
);

/**
 * Register Actions
 */
export const doRegister = createAction(
  type('[Account] Do Register'),
  props<{ registerForm: RegisterForm }>()
);
export const doRegisterSuccess = createAction(
  type('[Account] Do Register Success'),
  props<{ user: AuthUser }>()
);
export const doRegisterFail = createAction(type('[Account] Do Register Fail'));

/**
 * Logout Actions
 */
export const doLogout = createAction(type('[Account] Do Logout'));
export const doLogoutSuccess = createAction(
  type('[Account] Do Logout Success')
);
export const doLogoutFail = createAction(type('[Account] Do Logout Fail'));
