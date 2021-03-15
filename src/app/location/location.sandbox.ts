import { Injectable, Injector } from '@angular/core';
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
  LocationCreateForm,
  CityUpdateForm,
  StateUpdateForm,
  CountryUpdateForm,
  LocationUpdateForm,
} from './models/form/';
import { LocationState, locationActions, locationSelectors } from './store';

@Injectable()
export class LocationSandbox extends Sandbox {
  private subscriptions: Array<Subscription> = [];

  // City Observables
  citiesData$ = this.store.pipe(select(locationSelectors.getCitiesList));
  citiesMeta$ = this.store.pipe(select(locationSelectors.getCitiesMeta));
  citiesLoaded$ = this.store.pipe(select(locationSelectors.getCitiesLoaded));
  citiesLoading$ = this.store.pipe(select(locationSelectors.getCitiesLoading));
  citiesFailed$ = this.store.pipe(select(locationSelectors.getCitiesFailed));
  city$ = this.store.pipe(select(locationSelectors.getCityDetail));
  cityLoaded$ = this.store.pipe(select(locationSelectors.getCityLoaded));
  cityLoading$ = this.store.pipe(select(locationSelectors.getCityLoading));
  cityFailed$ = this.store.pipe(select(locationSelectors.getCityFailed));

  // Country Observables
  countriesData$ = this.store.pipe(select(locationSelectors.getCountriesList));
  countriesMeta$ = this.store.pipe(select(locationSelectors.getCountriesMeta));
  countriesLoaded$ = this.store.pipe(
    select(locationSelectors.getCountriesLoaded)
  );
  countriesLoading$ = this.store.pipe(
    select(locationSelectors.getCountriesLoading)
  );
  countriesFailed$ = this.store.pipe(
    select(locationSelectors.getCountriesFailed)
  );
  country$ = this.store.pipe(select(locationSelectors.getCountryDetail));
  countryLoaded$ = this.store.pipe(select(locationSelectors.getCountryLoaded));
  countryLoading$ = this.store.pipe(
    select(locationSelectors.getCountryLoading)
  );
  countryFailed$ = this.store.pipe(select(locationSelectors.getCountryFailed));

  // Location Observables
  locationsData$ = this.store.pipe(select(locationSelectors.getLocationsList));
  locationsMeta$ = this.store.pipe(select(locationSelectors.getLocationsMeta));
  locationsLoaded$ = this.store.pipe(
    select(locationSelectors.getLocationsLoaded)
  );
  locationsLoading$ = this.store.pipe(
    select(locationSelectors.getLocationsLoading)
  );
  locationsFailed$ = this.store.pipe(
    select(locationSelectors.getLocationsFailed)
  );
  location$ = this.store.pipe(select(locationSelectors.getLocationDetail));
  locationLoaded$ = this.store.pipe(
    select(locationSelectors.getLocationLoaded)
  );
  locationLoading$ = this.store.pipe(
    select(locationSelectors.getLocationLoading)
  );
  locationFailed$ = this.store.pipe(
    select(locationSelectors.getLocationFailed)
  );

  // State Observables
  statesData$ = this.store.pipe(select(locationSelectors.getStatesList));
  statesMeta$ = this.store.pipe(select(locationSelectors.getStatesMeta));
  statesLoaded$ = this.store.pipe(select(locationSelectors.getStatesLoaded));
  statesLoading$ = this.store.pipe(select(locationSelectors.getStatesLoading));
  statesFailed$ = this.store.pipe(select(locationSelectors.getStatesFailed));
  state$ = this.store.pipe(select(locationSelectors.getStateDetail));
  stateLoaded$ = this.store.pipe(select(locationSelectors.getStateLoaded));
  stateLoading$ = this.store.pipe(select(locationSelectors.getStateLoading));
  stateFailed$ = this.store.pipe(select(locationSelectors.getStateFailed));

  constructor(
    protected store: Store<LocationState>,
    protected injector: Injector
  ) {
    super(injector);
  }

  // City Methods
  /**
   * Dispatches fetch cities action
   * @param criteria Request Criteria for cities
   */
  fetchCities(criteria: RequestCriteria<SearchCityForm>): void {
    this.store.dispatch(
      locationActions.doFetchCities({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch city action
   * @param id ID of the city to fetch
   */
  fetchCity(id: string): void {
    this.store.dispatch(locationActions.doFetchCity({ id }));
  }

  /**
   * Dispatches create city action
   * @param form Form containing data of city to create
   */
  createCity(form: CityCreateForm): void {
    this.store.dispatch(locationActions.doCreateCity({ form }));
  }

  /**
   * Dispatches update city action
   * @param form Form containing data of city to update
   */
  updateCity(form: CityUpdateForm): void {
    this.store.dispatch(locationActions.doUpdateCity({ form }));
  }

  /**
   * Dispatches delete city action
   * @param id ID of the city to delete
   */
  deleteCity(id: string): void {
    this.store.dispatch(locationActions.doDeleteCity({ id }));
  }

  // Country Methods
  /**
   * Dispatches fetch countries action
   * @param criteria Request Criteria for countries
   */
  fetchCountries(criteria: RequestCriteria<SearchCountryForm>): void {
    this.store.dispatch(
      locationActions.doFetchCountries({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch country action
   * @param id ID of the country to fetch
   */
  fetchCountry(id: string): void {
    this.store.dispatch(locationActions.doFetchCountry({ id }));
  }

  /**
   * Dispatches create country action
   * @param form Form containing data of country to create
   */
  createCountry(form: CountryCreateForm): void {
    this.store.dispatch(locationActions.doCreateCountry({ form }));
  }

  /**
   * Dispatches update country action
   * @param form Form containing data of country to update
   */
  updateCountry(form: CountryUpdateForm): void {
    this.store.dispatch(locationActions.doUpdateCountry({ form }));
  }

  /**
   * Dispatches delete country action
   * @param id ID of the country to delete
   */
  deleteCountry(id: string): void {
    this.store.dispatch(locationActions.doDeleteCountry({ id }));
  }

  // Location Methods
  /**
   * Dispatches fetch locations action
   * @param criteria Request Criteria for locations
   */
  fetchLocations(criteria: RequestCriteria<SearchLocationForm>): void {
    this.store.dispatch(
      locationActions.doFetchLocations({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch location action
   * @param id ID of the location to fetch
   */
  fetchLocation(id: string): void {
    this.store.dispatch(locationActions.doFetchLocation({ id }));
  }

  /**
   * Dispatches create location action
   * @param form Form containing data of location to create
   */
  createLocation(form: LocationCreateForm): void {
    this.store.dispatch(locationActions.doCreateLocation({ form }));
  }
  /**
   * Dispatches update location action
   * @param form Form containing data of location to update along with ID
   */
  updateLocation(form: LocationUpdateForm): void {
    this.store.dispatch(locationActions.doUpdateLocation({ form }));
  }

  /**
   * Dispatches delete location action
   * @param id ID of the location to delete
   */
  deleteLocation(id: string): void {
    this.store.dispatch(locationActions.doDeleteLocation({ id }));
  }

  // State Methods
  /**
   * Dispatches fetch states action
   * @param criteria Request Criteria for states
   */
  fetchStates(criteria: RequestCriteria<SearchStateForm>): void {
    this.store.dispatch(
      locationActions.doFetchStates({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch state action
   * @param id ID of the state to fetch
   */
  fetchState(id: string): void {
    this.store.dispatch(locationActions.doFetchState({ id }));
  }

  /**
   * Dispatches create state action
   * @param form Form containing data of state to create
   */
  createState(form: StateCreateForm): void {
    this.store.dispatch(locationActions.doCreateState({ form }));
  }

  /**
   * Dispatches update state action
   * @param form Form containing data of state to update along with ID
   */
  updateState(form: StateUpdateForm): void {
    this.store.dispatch(locationActions.doUpdateState({ form }));
  }

  /**
   * Dispatches delete state action
   * @param id ID of the state to delete
   */
  deleteState(id: string): void {
    this.store.dispatch(locationActions.doDeleteState({ id }));
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
