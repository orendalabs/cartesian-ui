import { Injectable }       from '@angular/core';
import { Observable, of }   from 'rxjs';
import { map, mergeMap, switchMap, catchError }   from 'rxjs/operators';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Action, Store }    from '@ngrx/store';
import { AuthToken, User }  from '@shared/models';
import { AuthHttpService }  from '../shared/services/http/auth.http';
import { State }            from '@app/app.store';
import * as fromAuthActions from './auth.action';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authHttpService: AuthHttpService,
    private store: Store<State>
  ) {}


  /**
   * Login effect
   */
  doLogin$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.doLoginAction),
    map((action) => action.loginForm),
    switchMap(loginForm => {
      return this.authHttpService.login(loginForm).pipe(
        map(token => fromAuthActions.doLoginSuccessAction({ authToken: new AuthToken(token)})),
        catchError(error => of(fromAuthActions.doLoginFailAction()))
      )
    })
  ));


  /**
   * Fetch User effect
   */
  fetchAuthenticatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.fetchUserAction),
    switchMap(() => {
      return this.authHttpService.fetchUser().pipe(
        map(user => fromAuthActions.fetchUserSuccessAction({user: new User(user)})),
        catchError(error => of(fromAuthActions.fetchUserFailAction()))
      )
    })
  ));

  /**
   * Registers effect
   */
  doRegister$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.doRegisterAction),
    map((action) => action.registerForm),
    switchMap(registerForm => {
      return this.authHttpService.register(registerForm).pipe(
        map(user    => fromAuthActions.doRegisterSuccessAction({ user: new User(user)})),
        catchError(error => of(fromAuthActions.doRegisterFailAction()))
      )
    })
  ));

  /**
   * Logout effect
   */
  doLogout$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuthActions.doLogoutAction),
    switchMap(() => {
      return this.authHttpService.logout().pipe(
        map(() => fromAuthActions.doLogoutSuccessAction()),
        catchError(error => of(fromAuthActions.doLogoutFailAction()))
      )
    })
  ));
}
