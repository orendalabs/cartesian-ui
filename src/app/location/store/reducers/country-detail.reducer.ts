import { Action, createReducer, on } from '@ngrx/store';
import { CountryDetailState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: CountryDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createCountryDetailReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchCountry,
    locationActions.doCreateCountry,
    locationActions.doUpdateCountry,
    locationActions.doDeleteCountry,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchCountrySuccess,
    locationActions.doCreateCountrySuccess,
    locationActions.doUpdateCountrySuccess,
    locationActions.doDeleteCountrySuccess,
    (state, { country }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: country,
      });
    }
  ),
  on(
    locationActions.doFetchCountryFail,
    locationActions.doCreateCountryFail,
    locationActions.doUpdateCountryFail,
    locationActions.doDeleteCountryFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: CountryDetailState | undefined, action: Action) {
  return createCountryDetailReducers(state, action);
}
