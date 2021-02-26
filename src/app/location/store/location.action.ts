import { createAction, props } from '@ngrx/store';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';
import { City, Country, Location, State } from '../models/domain';
import { 
  CityCreateForm, 
  CountryCreateForm, 
  LocationCreateForm, 
  StateCreateForm, 
  CityUpdateForm, 
  CountryUpdateForm, 
  LocationUpdateForm, 
  StateUpdateForm 
} from '../models/form';

/**
 * Fetch Cities Actions
 */
export const doFetchCities = createAction(
  type('[Location] Do Fetch Cities'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchCitiesSuccess = createAction(
  type('[Location] Do Fetch Cities Success'),
  props<{ cities: City[] }>()
);
export const doFetchCitiesFail = createAction(
  type('[Location] Do Fetch Cities Fail')
);

/**
 * Fetch City Actions
 */
export const doFetchCity = createAction(
  type('[Location] Do Fetch City'),
  props<{ id: string }>()
);
export const doFetchCitySuccess = createAction(
  type('[Location] Do Fetch City Success'),
  props<{ city: City }>()
);
export const doFetchCityFail = createAction(
  type('[Location] Do Fetch City Fail')
);

/**
 * Create City Actions
 */
export const doCreateCity = createAction(
  type('[Location] Do Create City'),
  props<{ form: CityCreateForm }>()
);
export const doCreateCitySuccess = createAction(
  type('[Location] Do Create City Success'),
  props<{ city: City }>()
);
export const doCreateCityFail = createAction(
  type('[Location] Do Create City Fail')
);

/**
 * Update City Actions
 */
export const doUpdateCity = createAction(
  type('[Location] Do Update City'),
  props<{ form: CityUpdateForm }>()
);
export const doUpdateCitySuccess = createAction(
  type('[Location] Do Update City Success'),
  props<{ city: City }>()
);
export const doUpdateCityFail = createAction(
  type('[Location] Do Update City Fail')
);

/**
 * Fetch Countries Actions
 */
export const doFetchCountries = createAction(
  type('[Location] Do Fetch Countries'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchCountriesSuccess = createAction(
  type('[Location] Do Fetch Countries Success'),
  props<{ countries: Country[] }>()
);
export const doFetchCountriesFail = createAction(
  type('[Location] Do Fetch Countries Fail')
);

/**
 * Fetch Country Actions
 */
export const doFetchCountry = createAction(
  type('[Location] Do Fetch Country'),
  props<{ id: string }>()
);
export const doFetchCountrySuccess = createAction(
  type('[Location] Do Fetch Country Success'),
  props<{ country: Country }>()
);
export const doFetchCountryFail = createAction(
  type('[Location] Do Fetch Country Fail')
);

/**
 * Create Country Actions
 */
export const doCreateCountry = createAction(
  type('[Location] Do Create Country'),
  props<{ form: CountryCreateForm }>()
);
export const doCreateCountrySuccess = createAction(
  type('[Location] Do Create Country Success'),
  props<{ country: Country }>()
);
export const doCreateCountryFail = createAction(
  type('[Location] Do Create Country Fail')
);

/**
 * Update Country Actions
 */
export const doUpdateCountry = createAction(
  type('[Location] Do Update Country'),
  props<{ form: CountryUpdateForm }>()
);
export const doUpdateCountrySuccess = createAction(
  type('[Location] Do Update Country Success'),
  props<{ country: Country }>()
);
export const doUpdateCountryFail = createAction(
  type('[Location] Do Update Country Fail')
);
/**
 * Fetch Locations Actions
 */
export const doFetchLocations = createAction(
  type('[Location] Do Fetch Locations'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchLocationsSuccess = createAction(
  type('[Location] Do Fetch Locations Success'),
  props<{ locations: Location[] }>()
);
export const doFetchLocationsFail = createAction(
  type('[Location] Do Fetch Locations Fail')
);

/**
 * Fetch Location Actions
 */
export const doFetchLocation = createAction(
  type('[Location] Do Fetch Location'),
  props<{ id: string }>()
);
export const doFetchLocationSuccess = createAction(
  type('[Location] Do Fetch Location Success'),
  props<{ location: Location }>()
);
export const doFetchLocationFail = createAction(
  type('[Location] Do Fetch Location Fail')
);

/**
 * Create Location Actions
 */
export const doCreateLocation = createAction(
  type('[Location] Do Create Location'),
  props<{ form: LocationCreateForm }>()
);
export const doCreateLocationSuccess = createAction(
  type('[Location] Do Create Location Success'),
  props<{ location: Location }>()
);
export const doCreateLocationFail = createAction(
  type('[Location] Do Create Location Fail')
);

/**
 * Update Location Actions
 */
export const doUpdateLocation = createAction(
  type('[Location] Do Update Location'),
  props<{ form: LocationUpdateForm }>()
);
export const doUpdateLocationSuccess = createAction(
  type('[Location] Do Update Location Success'),
  props<{ location: Location }>()
);
export const doUpdateLocationFail = createAction(
  type('[Location] Do Update Location Fail')
);

/**
 * Fetch States Actions
 */
export const doFetchStates = createAction(
  type('[Location] Do Fetch States'),
  props<{ requestCriteria: RequestCriteria<any> }>()
);
export const doFetchStatesSuccess = createAction(
  type('[Location] Do Fetch States Success'),
  props<{ states: State[] }>()
);
export const doFetchStatesFail = createAction(
  type('[Location] Do Fetch States Fail')
);

/**
 * Fetch State Actions
 */
export const doFetchState = createAction(
  type('[Location] Do Fetch State'),
  props<{ id: string }>()
);
export const doFetchStateSuccess = createAction(
  type('[Location] Do Fetch State Success'),
  props<{ state: State }>()
);
export const doFetchStateFail = createAction(
  type('[Location] Do Fetch State Fail')
);

/**
 * Create State Actions
 */
export const doCreateState = createAction(
  type('[Location] Do Create State'),
  props<{ form: StateCreateForm }>()
);
export const doCreateStateSuccess = createAction(
  type('[Location] Do Create State Success'),
  props<{ state: State }>()
);
export const doCreateStateFail = createAction(
  type('[Location] Do Create State Fail')
);

/**
 * Update State Actions
 */
export const doUpdateState = createAction(
  type('[Location] Do Update State'),
  props<{ form: StateUpdateForm }>()
);
export const doUpdateStateSuccess = createAction(
  type('[Location] Do Update State Success'),
  props<{ state: State }>()
);
export const doUpdateStateFail = createAction(
  type('[Location] Do Update State Fail')
);