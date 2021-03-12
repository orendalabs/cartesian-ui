import { Action, createReducer, on } from '@ngrx/store';
import { LocationListingState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: LocationListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createLocationListingReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchLocations,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchLocationsSuccess,
    (state, { locations }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: locations,
      });
    }
  ),
  on(
    locationActions.doFetchLocationsFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: LocationListingState | undefined, action: Action) {
  return createLocationListingReducers(state, action);
}
