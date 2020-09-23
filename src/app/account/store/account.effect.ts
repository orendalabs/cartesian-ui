import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { AuthToken, Tenant, User } from '../models';
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
  doAuthenticate$ = createEffect(() => this.actions$.pipe(
    ofType(fromAccountActions.doAuthenticateAction),
    map((action) => action.loginForm),
    switchMap(loginForm => {
      return this.accountHttpService.login(loginForm).pipe(
        map(token => fromAccountActions.doAuthenticateSuccessAction({ authToken: new AuthToken(token)})),
        catchError(error => of(fromAccountActions.doAuthenticateFailAction()))
      )
    })
  ));


  /**
   * Fetch User effect
   */
  fetchAuthenticatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(fromAccountActions.fetchAuthenticatedUser),
    switchMap(() => {
      return this.accountHttpService.fetchUser().pipe(
        map(user => fromAccountActions.fetchAuthenticatedUserSuccess({ user: new User(user) })),
        catchError(error => of(fromAccountActions.fetchAuthenticatedUserFail()))
      )
    })
  ));


  /**
   * Fetch User effect
   */
  fetchAuthenticatedTenant$ = createEffect(() => this.actions$.pipe(
    ofType(fromAccountActions.fetchAuthenticatedTenant),
    switchMap(() => {
      return this.accountHttpService.fetchUser().pipe(
        map(tenant => fromAccountActions.fetchAuthenticatedTenantSuccess({ tenant: new Tenant(tenant) })),
        catchError(error => of(fromAccountActions.fetchAuthenticatedTenantFail()))
      )
    })
  ));


  /**
   * Registers effect
   */
  doRegister$ = createEffect(() => this.actions$.pipe(
    ofType(fromAccountActions.doRegisterAction),
    map((action) => action.registerForm),
    switchMap(registerForm => {
      return this.accountHttpService.register(registerForm).pipe(
        map(user    => fromAccountActions.doRegisterSuccessAction({ user: new User(user)})),
        catchError(error => of(fromAccountActions.doRegisterFailAction()))
      )
    })
  ));

  /**
   * Logout effect
   */
  doLogout$ = createEffect(() => this.actions$.pipe(
    ofType(fromAccountActions.doLogoutAction),
    switchMap(() => {
      return this.accountHttpService.logout().pipe(
        map(() => fromAccountActions.doLogoutSuccessAction()),
        catchError(error => of(fromAccountActions.doLogoutFailAction()))
      )
    })
  ));
}
