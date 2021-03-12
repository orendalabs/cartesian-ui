import { Action, createReducer, on } from '@ngrx/store';
import { StateListingState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: StateListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createStateListingReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchStates,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchStatesSuccess,
    (state, { states }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: states,
      });
    }
  ),
  on(
    locationActions.doFetchStatesFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: StateListingState | undefined, action: Action) {
  return createStateListingReducers(state, action);
}
