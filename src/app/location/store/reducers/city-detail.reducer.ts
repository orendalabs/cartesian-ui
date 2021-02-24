import { Action, createReducer, on } from '@ngrx/store';
import { CityDetailState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: CityDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createCityDetailReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchCity,
    locationActions.doCreateCity,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchCitySuccess,
    locationActions.doCreateCitySuccess,
    (state, { city }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: city,
      });
    }
  ),
  on(
    locationActions.doFetchCityFail,
    locationActions.doCreateCityFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: CityDetailState | undefined, action: Action) {
  return createCityDetailReducers(state, action);
}
