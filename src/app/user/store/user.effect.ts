import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { User } from '../models';
import { UserHttpService } from '../shared';
import * as fromUserActions from './user.action';

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
      ofType(fromUserActions.doFetchUsers),
      map((action) => action.requestCriteria),
      switchMap((requestCriteria) => {
        return this.userHttpService.users(requestCriteria).pipe(
          map((users) =>
            fromUserActions.doFetchUsersSuccess({
              users: users,
            })
          ),
          catchError((error) => of(fromUserActions.doFetchUsersFail()))
        );
      })
    )
  );
}
