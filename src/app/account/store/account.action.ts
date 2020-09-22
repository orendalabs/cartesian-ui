import { createAction, props } from '@ngrx/store';
import {
  User,
  Tenant,
  AuthToken,
  LoginForm,
  RegisterForm
} from '../models';
import { type }   from '@cartesian-ui/ng-axis';


/**
 * Login Actions
 */
export const doLoginAction = createAction(type('[Auth] Do Login'), props<{ loginForm: LoginForm }>());
export const doLoginSuccessAction = createAction(type('[Auth] Do Login Success'), props<{ authToken: AuthToken }>());
export const doLoginFailAction = createAction(type('[Auth] Do Login Fail'));
export const addAuthTokenAction = createAction(type('[Auth] Add Auth Token'), props<{ authToken: AuthToken }>());
export const removeAuthTokenAction = createAction(type('[Auth] Remove Auth Token'), props<{ authToken: AuthToken }>());

/**
 * Tenant Actions
 */
export const fetchAuthenticatedTenant = createAction(type('[Auth] Fetch Tenant'), props<{ id: string }>());
export const fetchAuthenticatedTenantSuccess = createAction(type('[Auth] Fetch Tenant Success'), props<{ tenant: Tenant }>());
export const fetchAuthenticatedTenantFail = createAction(type('[Auth] Fetch Tenant Fail'));
export const addAuthenticatedTenantAction = createAction(type('[Auth] Add Tenant'), props<{ tenant: Tenant }>());
export const removeAuthenticatedTenantAction = createAction(type('[Auth] Remove Tenant'), props<{ tenant: Tenant }>());


/**
 * User Actions
 */
export const fetchAuthenticatedUser = createAction(type('[Auth] Fetch User'));
export const fetchAuthenticatedUserSuccess = createAction(type('[Auth] Fetch User Success'), props<{ user: User }>());
export const fetchAuthenticatedUserFail = createAction(type('[Auth] Fetch User Fail'));
export const addAuthenticatedUserAction = createAction(type('[Auth] Add Authenticated User'), props<{ user: User }>());
export const removeAuthenticatedUserAction = createAction(type('[Auth] Remove Authenticated User'), props<{ user: User }>());


/**
 * Register Actions
 */
export const doRegisterAction = createAction(type('[Auth] Do Register'), props<{ registerForm: RegisterForm }>());
export const doRegisterSuccessAction = createAction(type('[Auth] Do Register Success'), props<{ user: User }>());
export const doRegisterFailAction = createAction(type('[Auth] Do Register Fail'));


/**
 * Logout Actions
 */
export const doLogoutAction = createAction(type('[Auth] Do Logout'));
export const doLogoutSuccessAction = createAction(type('[Auth] Do Logout Success'));
export const doLogoutFailAction = createAction(type('[Auth] Do Logout Fail'));
