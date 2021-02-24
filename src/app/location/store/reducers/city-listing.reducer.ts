import { Action, createReducer, on } from '@ngrx/store';
import { CityListingState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: CityListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createCityListingReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchCities,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchCitiesSuccess,
    (state, { cities }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: cities,
      });
    }
  ),
  on(
    locationActions.doFetchCitiesFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: CityListingState | undefined, action: Action) {
  return createCityListingReducers(state, action);
}
