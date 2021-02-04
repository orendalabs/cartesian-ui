import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { UserHttpService } from '../shared';
import * as userActions from './user.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userHttpService: UserHttpService,
    private store: Store<State>
  ) {}

  /**
   * Fetch Users effect
   */
  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchUsers),
      map((action) => action.requestCriteria),
      switchMap((criteria) => {
        return this.userHttpService.users(criteria).pipe(
          map((users) =>
            userActions.doFetchUsersSuccess({
              users,
            })
          ),
          catchError((error) => of(userActions.doFetchUsersFail()))
        );
      })
    )
  );

  /**
   * Fetch Admins effect
   */
  fetchAdmins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchAdmins),
      map((action) => action.requestCriteria),
      switchMap((criteria) => {
        return this.userHttpService.admins(criteria).pipe(
          map((users) =>
            userActions.doFetchAdminsSuccess({
              users,
            })
          ),
          catchError((error) => of(userActions.doFetchAdminsFail()))
        );
      })
    )
  );

  /**
   * Fetch Clients effect
   */
  fetchClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchClients),
      map((action) => action.requestCriteria),
      switchMap((criteria) => {
        return this.userHttpService.clients(criteria).pipe(
          map((users) =>
            userActions.doFetchClientsSuccess({
              users,
            })
          ),
          catchError((error) => of(userActions.doFetchClientsFail()))
        );
      })
    )
  );

  /**
   * Fetch User effect
   */
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchUser),
      map((action) =>
        Object.assign({}, { id: action.id, criteria: action.criteria })
      ),
      switchMap((object) => {
        const res = object.criteria
          ? this.userHttpService.filteredUser(object.id, object.criteria)
          : this.userHttpService.user(object.id);
        return res.pipe(
          map((user) =>
            userActions.doFetchUserSuccess({
              user: user.data,
            })
          ),
          catchError((error) => of(userActions.doFetchUserFail()))
        );
      })
    )
  );

  /**
   * Fetch Authenticated User effect
   */
  fetchAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchAuthenticatedUser),
      map((action) => action.token),
      switchMap((token) => {
        return this.userHttpService.profile(token).pipe(
          map((user) =>
            userActions.doFetchAuthenticatedUserSuccess({
              user: user.data,
            })
          ),
          catchError((error) => of(userActions.doFetchAuthenticatedUserFail()))
        );
      })
    )
  );

  /**
   * Create User effect
   */
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doCreateUser),
      map((action) => action.form),
      switchMap((form) => {
        return this.userHttpService.createAdminUser(form).pipe(
          map((user) =>
            userActions.doCreateUserSuccess({
              user: user.data,
            })
          ),
          catchError((error) => of(userActions.doCreateUserFail()))
        );
      })
    )
  );

  /**
   * Update User effect
   */
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doUpdateUser),
      map((action) => Object.assign({}, { id: action.id, form: action.form })),
      switchMap((data) => {
        return this.userHttpService.updateUser(data.id, data.form).pipe(
          map((user) =>
            userActions.doUpdateUserSuccess({
              user: user.data,
            })
          ),
          catchError((error) => of(userActions.doUpdateUserFail()))
        );
      })
    )
  );

  /**
   * Delete User effect
   */
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doDeleteUser),
      map((action) => action.id),
      switchMap((id) => {
        return this.userHttpService.deleteUserById(id).pipe(
          map((user) =>
            userActions.doDeleteUserSuccess({
              user: user.data,
            })
          ),
          catchError((error) => of(userActions.doDeleteUserFail()))
        );
      })
    )
  );
}
