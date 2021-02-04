import { createAction, props } from '@ngrx/store';
import { User } from '../models';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';
import { AdminUserCreateForm } from '../models/form/admin-user.model';
import { EditUserForm } from '../models/form/edit-user.model';
import { SearchUserForm } from '../models/form/search-user.model';
import { Role } from '@app/authorization/models/role.model';

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
 * Fetch Admins Actions
 */
export const doFetchAdmins = createAction(
  type('[User] Do Fetch Admins'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchAdminsSuccess = createAction(
  type('[User] Do Fetch Admins Success'),
  props<{ users: User[] }>()
);
export const doFetchAdminsFail = createAction(
  type('[User] Do Fetch Admins Fail')
);

/**
 * Fetch Clients Actions
 */
export const doFetchClients = createAction(
  type('[User] Do Fetch Clients'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchClientsSuccess = createAction(
  type('[User] Do Fetch Clients Success'),
  props<{ users: User[] }>()
);
export const doFetchClientsFail = createAction(
  type('[User] Do Fetch Clients Fail')
);

/**
 * Fetch User Actions
 */
export const doFetchUser = createAction(
  type('[User] Do Fetch User'),
  props<{ id: string; criteria?: RequestCriteria<SearchUserForm> }>()
);
export const doFetchUserSuccess = createAction(
  type('[User] Do Fetch User Success'),
  props<{ user: User }>()
);
export const doFetchUserFail = createAction(type('[User] Do Fetch User Fail'));

/**
 * Create User Actions
 */
export const doCreateUser = createAction(
  type('[User] Do Create User'),
  props<{ form: AdminUserCreateForm }>()
);
export const doCreateUserSuccess = createAction(
  type('[User] Do Create User Success'),
  props<{ user: User }>()
);
export const doCreateUserFail = createAction(
  type('[User] Do Create User Fail')
);

/**
 * Update User Actions
 */
export const doUpdateUser = createAction(
  type('[User] Do Update User'),
  props<{ id: string; form: EditUserForm }>()
);
export const doUpdateUserSuccess = createAction(
  type('[User] Do Update User Success'),
  props<{ user: User }>()
);
export const doUpdateUserFail = createAction(
  type('[User] Do Update User Fail')
);

/**
 * Delete User Actions
 */
export const doDeleteUser = createAction(
  type('[User] Do Delete User'),
  props<{ id: string }>()
);
export const doDeleteUserSuccess = createAction(
  type('[User] Do Delete User Success'),
  props<{ user: User }>()
);
export const doDeleteUserFail = createAction(
  type('[User] Do Delete User Fail')
);

/**
 * Fetch User Profile Actions
 */
export const doFetchAuthenticatedUser = createAction(
  type('[User] Do Fetch Authenticated User'),
  props<{ token: string }>()
);
export const doFetchAuthenticatedUserSuccess = createAction(
  type('[User] Do Fetch Authenticated User Success'),
  props<{ user: User }>()
);
export const doFetchAuthenticatedUserFail = createAction(
  type('[User] Do Fetch Authenticated Fail')
);
