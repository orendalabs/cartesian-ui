import { createAction, props } from '@ngrx/store';
import {
  User,
  AuthToken,
  LoginForm,
  RegisterForm
} from '@shared/models';
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
