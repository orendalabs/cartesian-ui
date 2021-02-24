import { createAction, props } from '@ngrx/store';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';
import { City, Country, Location, State } from '../models/domain';
import { CityCreateForm } from '../models/form';

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
