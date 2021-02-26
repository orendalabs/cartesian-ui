import { Action, createReducer, on } from '@ngrx/store';
import { LocationDetailState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: LocationDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createLocationDetailReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchLocation,
    locationActions.doCreateLocation,
    locationActions.doUpdateLocation,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchLocationSuccess,
    locationActions.doCreateLocationSuccess,
    locationActions.doUpdateLocationSuccess,
    (state, { location }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: location,
      });
    }
  ),
  on(
    locationActions.doFetchLocationFail,
    locationActions.doCreateLocationFail,
    locationActions.doUpdateLocationFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: LocationDetailState | undefined, action: Action) {
  return createLocationDetailReducers(state, action);
}
