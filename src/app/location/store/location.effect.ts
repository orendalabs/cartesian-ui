import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { LocationHttpService } from '../shared';
import * as locationActions from './location.action';
import { ManageRoleForm } from '@app/authorization/models/manage/role.model';

@Injectable()
export class LocationEffects {
  constructor(
    private actions$: Actions,
    private locationHttpService: LocationHttpService,
    private store: Store<State>
  ) {}

  fetchCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchCities),
      map((action) => action.requestCriteria),
      switchMap((crit) => 
        this.locationHttpService.fetchCities(crit).pipe(
          map((cities) => locationActions.doFetchCitiesSuccess(
            { cities }
          )),
          catchError((error) => of(locationActions.doFetchCitiesFail()))
        )
      )
    );
  })
}
