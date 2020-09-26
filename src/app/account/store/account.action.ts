import { createAction, props } from '@ngrx/store';
import { User, Tenant, AuthToken, LoginForm, RegisterForm } from '../models';
import { type } from '@cartesian-ui/ng-axis';

/**
 * Login Actions
 */
export const doAuthenticateAction = createAction(
  type('[Account] Do Authenticate'),
  props<{ loginForm: LoginForm }>()
);
export const doAuthenticateSuccessAction = createAction(
  type('[Account] Do Authenticate Success'),
  props<{ authToken: AuthToken }>()
);
export const doAuthenticateFailAction = createAction(
  type('[Account] Do Authenticate Fail')
);
export const addAuthTokenAction = createAction(
  type('[Account] Add Auth Token'),
  props<{ authToken: AuthToken }>()
);
export const removeAuthTokenAction = createAction(
  type('[Account] Remove Auth Token'),
  props<{ authToken: AuthToken }>()
);

/**
 * Tenant Actions
 */
export const fetchAuthenticatedTenant = createAction(
  type('[Account] Fetch Tenant'),
  props<{ id: string }>()
);
export const fetchAuthenticatedTenantSuccess = createAction(
  type('[Account] Fetch Tenant Success'),
  props<{ tenant: Tenant }>()
);
export const fetchAuthenticatedTenantFail = createAction(
  type('[Account] Fetch Tenant Fail')
);
export const addAuthenticatedTenantAction = createAction(
  type('[Account] Add Tenant'),
  props<{ tenant: Tenant }>()
);
export const removeAuthenticatedTenantAction = createAction(
  type('[Account] Remove Tenant'),
  props<{ tenant: Tenant }>()
);

/**
 * User Actions
 */
export const fetchAuthenticatedUser = createAction(
  type('[Account] Fetch User')
);
export const fetchAuthenticatedUserSuccess = createAction(
  type('[Account] Fetch User Success'),
  props<{ user: User }>()
);
export const fetchAuthenticatedUserFail = createAction(
  type('[Account] Fetch User Fail')
);
export const addAuthenticatedUserAction = createAction(
  type('[Account] Add Authenticated User'),
  props<{ user: User }>()
);
export const removeAuthenticatedUserAction = createAction(
  type('[Account] Remove Authenticated User'),
  props<{ user: User }>()
);

/**
 * Register Actions
 */
export const doRegisterAction = createAction(
  type('[Account] Do Register'),
  props<{ registerForm: RegisterForm }>()
);
export const doRegisterSuccessAction = createAction(
  type('[Account] Do Register Success'),
  props<{ user: User }>()
);
export const doRegisterFailAction = createAction(
  type('[Account] Do Register Fail')
);

/**
 * Logout Actions
 */
export const doLogoutAction = createAction(type('[Account] Do Logout'));
export const doLogoutSuccessAction = createAction(
  type('[Account] Do Logout Success')
);
export const doLogoutFailAction = createAction(
  type('[Account] Do Logout Fail')
);
