import { Injectable } from '@angular/core';
import { of }   from 'rxjs';
import { map, mergeMap, switchMap, catchError }   from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store }    from '@ngrx/store';
import { Tenant, User }  from '@shared/models';
import { AuthHttpService }  from '@app/account/shared/services/http/auth.http';
import { State }            from '@app/app.store';
import * as sessionActions from './session.action';


@Injectable()
export class SessionEffect {

  constructor(
    private actions$: Actions,
    private authHttpService: AuthHttpService,
    private store: Store<State>
  ) {}


  /**
   * Fetch User effect
   */
  fetchSessionUser$ = createEffect(() => this.actions$.pipe(
    ofType(sessionActions.fetchSessionUser),
    switchMap(() => {
      return this.authHttpService.fetchUser().pipe(
        map(user => sessionActions.fetchSessionUserSuccess({ user: new User(user) })),
        catchError(error => of(sessionActions.fetchSessionUserFail()))
      )
    })
  ));


  /**
   * Fetch User effect
   */
  fetchSessionTenant$ = createEffect(() => this.actions$.pipe(
    ofType(sessionActions.fetchSessionTenant),
    switchMap(() => {
      return this.authHttpService.fetchUser().pipe(
        map(tenant => sessionActions.fetchSessionTenantSuccess({ tenant: new Tenant(tenant) })),
        catchError(error => of(sessionActions.fetchSessionTenantFail()))
      )
    })
  ));

}
