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

  // City Effects
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
  });

  fetchCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchCity),
      map((action) => action.id),
      switchMap((id) => 
        this.locationHttpService.fetchCity(id).pipe(
          map((city) => locationActions.doFetchCitySuccess(
            { city: city.data }
          )),
          catchError((error) => of(locationActions.doFetchCityFail()))
        )
      )
    );
  });

  createCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doCreateCity),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.createCity(form).pipe(
          map((city) => locationActions.doCreateCitySuccess(
            { city: city.data }
          )),
          catchError((error) => of(locationActions.doCreateCityFail()))
        )
      )
    );
  });

  updateCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doUpdateCity),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.updateCity(form.id, form).pipe(
          map((city) => locationActions.doUpdateCitySuccess(
            { city: city.data }
          )),
          catchError((error) => of(locationActions.doUpdateCityFail()))
        )
      )
    );
  });

  // Country Effects
  fetchCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchCountries),
      map((action) => action.requestCriteria),
      switchMap((crit) => 
        this.locationHttpService.fetchCountries(crit).pipe(
          map((countries) => locationActions.doFetchCountriesSuccess(
            { countries }
          )),
          catchError((error) => of(locationActions.doFetchCountriesFail()))
        )
      )
    );
  });

  fetchCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchCountry),
      map((action) => action.id),
      switchMap((id) => 
        this.locationHttpService.fetchCountry(id).pipe(
          map((country) => locationActions.doFetchCountrySuccess(
            { country: country.data }
          )),
          catchError((error) => of(locationActions.doFetchCountryFail()))
        )
      )
    );
  });

  createCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doCreateCountry),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.createCountry(form).pipe(
          map((country) => locationActions.doCreateCountrySuccess(
            { country: country.data }
          )),
          catchError((error) => of(locationActions.doCreateCountryFail()))
        )
      )
    );
  });

  updateCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doUpdateCountry),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.updateCountry(form.id, form).pipe(
          map((country) => locationActions.doUpdateCountrySuccess(
            { country: country.data }
          )),
          catchError((error) => of(locationActions.doUpdateCountryFail()))
        )
      )
    );
  });

  // Location Effects
  fetchLocations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchLocations),
      map((action) => action.requestCriteria),
      switchMap((crit) => 
        this.locationHttpService.fetchLocations(crit).pipe(
          map((locations) => locationActions.doFetchLocationsSuccess(
            { locations }
          )),
          catchError((error) => of(locationActions.doFetchLocationsFail()))
        )
      )
    );
  });

  fetchLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchLocation),
      map((action) => action.id),
      switchMap((id) => 
        this.locationHttpService.fetchLocation(id).pipe(
          map((location) => locationActions.doFetchLocationSuccess(
            { location: location.data }
          )),
          catchError((error) => of(locationActions.doFetchLocationFail()))
        )
      )
    );
  });

  createLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doCreateLocation),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.createLocation(form).pipe(
          map((location) => locationActions.doCreateLocationSuccess(
            { location: location.data }
          )),
          catchError((error) => of(locationActions.doCreateLocationFail()))
        )
      )
    );
  });

  updateLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doUpdateLocation),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.updateLocation(form.id, form).pipe(
          map((location) => locationActions.doUpdateLocationSuccess(
            { location: location.data }
          )),
          catchError((error) => of(locationActions.doUpdateLocationFail()))
        )
      )
    );
  });

  // State Effects
  fetchStates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchStates),
      map((action) => action.requestCriteria),
      switchMap((crit) => 
        this.locationHttpService.fetchStates(crit).pipe(
          map((states) => locationActions.doFetchStatesSuccess(
            { states }
          )),
          catchError((error) => of(locationActions.doFetchStatesFail()))
        )
      )
    );
  });

  fetchState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doFetchState),
      map((action) => action.id),
      switchMap((id) => 
        this.locationHttpService.fetchState(id).pipe(
          map((state) => locationActions.doFetchStateSuccess(
            { state: state.data }
          )),
          catchError((error) => of(locationActions.doFetchStateFail()))
        )
      )
    );
  });

  createState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doCreateState),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.createState(form).pipe(
          map((state) => locationActions.doCreateStateSuccess(
            { state: state.data }
          )),
          catchError((error) => of(locationActions.doCreateStateFail()))
        )
      )
    );
  });

  updateState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(locationActions.doUpdateState),
      map((action) => action.form),
      switchMap((form) => 
        this.locationHttpService.updateState(form.id, form).pipe(
          map((state) => locationActions.doUpdateStateSuccess(
            { state: state.data }
          )),
          catchError((error) => of(locationActions.doUpdateStateFail()))
        )
      )
    );
  });
}
