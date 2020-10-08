import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { AuthToken, Tenant, AuthUser } from '../models';
import { AuthHttpService } from '../shared';
import * as fromAccountActions from './account.action';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountHttpService: AuthHttpService,
    private store: Store<State>
  ) {}

  /**
   * Login effect
   */
  doAuthenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAccountActions.doAuthenticate),
      map((action) => action.loginForm),
      switchMap((loginForm) => {
        return this.accountHttpService.login(loginForm).pipe(
          map((token) =>
            fromAccountActions.doAuthenticateSuccess({
              authToken: new AuthToken(token),
            })
          ),
          catchError((error) => of(fromAccountActions.doAuthenticateFail()))
        );
      })
    )
  );

  /**
   * Fetch AuthUser effect
   */
  fetchAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAccountActions.doFetchAuthenticatedUser),
      switchMap(() => {
        return this.accountHttpService.fetchUser().pipe(
          map((user) =>
            fromAccountActions.doFetchAuthenticatedUserSuccess({
              user: new AuthUser(user),
            })
          ),
          catchError((error) =>
            of(fromAccountActions.doFetchAuthenticatedUserFail())
          )
        );
      })
    )
  );

  /**
   * Fetch AuthUser effect
   */
  fetchAuthenticatedTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAccountActions.doFetchAuthenticatedTenant),
      switchMap(() => {
        return this.accountHttpService.fetchUser().pipe(
          map((tenant) =>
            fromAccountActions.doFetchAuthenticatedTenantSuccess({
              tenant: new Tenant(tenant),
            })
          ),
          catchError((error) =>
            of(fromAccountActions.doFetchAuthenticatedTenantFail())
          )
        );
      })
    )
  );

  /**
   * Registers effect
   */
  doRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAccountActions.doRegister),
      map((action) => action.registerForm),
      switchMap((registerForm) => {
        return this.accountHttpService.register(registerForm).pipe(
          map((user) =>
            fromAccountActions.doRegisterSuccess({ user: new AuthUser(user) })
          ),
          catchError((error) => of(fromAccountActions.doRegisterFail()))
        );
      })
    )
  );

  /**
   * Logout effect
   */
  doLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAccountActions.doLogout),
      switchMap(() => {
        return this.accountHttpService.logout().pipe(
          map(() => fromAccountActions.doLogoutSuccess()),
          catchError((error) => of(fromAccountActions.doLogoutFail()))
        );
      })
    )
  );
}
