import { createAction, props } from '@ngrx/store';
import { User } from '../models';
import { type } from '@cartesian-ui/ng-axis';

/**
 * Fetch User Actions
 */
export const doFetchUsers = createAction(
  type('[User] Do Fetch Users'),
  props<{ searchForm: SearchForm }>()
);
export const doFetchUsersSuccess = createAction(
  type('[User] Do Fetch Users Success'),
  props<{ user: User }>()
);
export const doFetchUsersFail = createAction(
  type('[User] Do Fetch Users Fail')
);

/**
 * Add User Actions
 */
export const doAddUser = createAction(
  type('[User] Do Add User'),
  props<{ registerForm: RegisterForm }>()
);
export const doAddUserSuccess = createAction(
  type('[User] Do Add User Success'),
  props<{ user: User }>()
);
export const doAddUserFail = createAction(type('[User] Do Add User Fail'));
