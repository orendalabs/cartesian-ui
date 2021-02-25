import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import { 
  SearchCityForm, 
  SearchCountryForm, 
  SearchLocationForm, 
  SearchStateForm, 
  CityCreateForm, 
  StateCreateForm, 
  CountryCreateForm, 
  LocationCreateForm 
} from './models/form/';
import { LocationState, locationActions, locationSelectors } from './store';

@Injectable()
export class LocationSandbox extends Sandbox {

  private subscriptions: Array<Subscription> = [];
  
  // City Observables
  citiesData$ = this.store.pipe(select(locationSelectors.getCitiesList));
  citiesMeta$ = this.store.pipe(select(locationSelectors.getCitiesMeta));

  // Country Observables
  countriesData$ = this.store.pipe(select(locationSelectors.getCountriesList));
  countriesMeta$ = this.store.pipe(select(locationSelectors.getCountriesMeta));

  // Location Observables
  locationsData$ = this.store.pipe(select(locationSelectors.getLocationsList));
  locationsMeta$ = this.store.pipe(select(locationSelectors.getLocationsMeta));

  // State Observables
  statesData$ = this.store.pipe(select(locationSelectors.getStatesList));
  statesMeta$ = this.store.pipe(select(locationSelectors.getStatesMeta));

  constructor(
    protected store: Store<LocationState>,
    private _router: Router,
    protected injector: Injector
  ) {
    super(injector);
  }

  // City Methods
  fetchCities(criteria: RequestCriteria<SearchCityForm>): void {
    this.store.dispatch(
      locationActions.doFetchCities({ requestCriteria: criteria })
    );
  }

  fetchCity(id: string): void {
    this.store.dispatch(
      locationActions.doFetchCity({ id: id })
    );
  }

  createCity(form: CityCreateForm): void {
    this.store.dispatch(
      locationActions.doCreateCity({ form: form })
    );
  }

  // Country Methods
  fetchCountries(criteria: RequestCriteria<SearchCountryForm>): void {
    this.store.dispatch(
      locationActions.doFetchCountries({ requestCriteria: criteria })
    );
  }

  fetchCountry(id: string): void {
    this.store.dispatch(
      locationActions.doFetchCountry({ id: id })
    );
  }

  createCountry(form: CountryCreateForm): void {
    this.store.dispatch(
      locationActions.doCreateCountry({ form: form })
    );
  }

  // Location Methods
  fetchLocations(criteria: RequestCriteria<SearchLocationForm>): void {
    this.store.dispatch(
      locationActions.doFetchLocations({ requestCriteria: criteria })
    );
  }

  fetchLocation(id: string): void {
    this.store.dispatch(
      locationActions.doFetchLocation({ id: id })
    );
  }

  createLocation(form: LocationCreateForm): void {
    this.store.dispatch(
      locationActions.doCreateLocation({ form: form })
    );
  }

  // State Methods
  fetchStates(criteria: RequestCriteria<SearchStateForm>): void {
    this.store.dispatch(
      locationActions.doFetchStates({ requestCriteria: criteria })
    );
  }

  fetchState(id: string): void {
    this.store.dispatch(
      locationActions.doFetchState({ id: id })
    );
  }

  createState(form: StateCreateForm): void {
    this.store.dispatch(
      locationActions.doCreateState({ form: form })
    );
  }


  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
