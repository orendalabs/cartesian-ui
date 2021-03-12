import { Action, createReducer, on } from '@ngrx/store';
import { CountryListingState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: CountryListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createCountryListingReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchCountries,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchCountriesSuccess,
    (state, { countries }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: countries,
      });
    }
  ),
  on(
    locationActions.doFetchCountriesFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: CountryListingState | undefined, action: Action) {
  return createCountryListingReducers(state, action);
}
