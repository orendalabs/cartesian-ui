import { createAction, props } from '@ngrx/store';
import { User } from '../models';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';

/**
 * Fetch Users Actions
 */
export const doFetchUsers = createAction(
  type('[User] Do Fetch Users'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchUsersSuccess = createAction(
  type('[User] Do Fetch Users Success'),
  props<{ users: User[] }>()
);
export const doFetchUsersFail = createAction(
  type('[User] Do Fetch Users Fail')
);

/**
 * Fetch User Actions
 */
export const doFetchUser = createAction(
  type('[User] Do Fetch User'),
  props<{ id: string }>()
);
export const doFetchUserSuccess = createAction(
  type('[User] Do Fetch User Success'),
  props<{ user: User }>()
);
export const doFetchUserFail = createAction(type('[User] Do Fetch User Fail'));
