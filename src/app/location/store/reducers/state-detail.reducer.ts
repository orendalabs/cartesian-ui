import { Action, createReducer, on } from '@ngrx/store';
import { StateDetailState } from '../location.state';
import * as locationActions from '../location.action';

const INITIAL_STATE: StateDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createStateDetailReducers = createReducer(
  INITIAL_STATE,
  on(
    locationActions.doFetchState,
    (state) => {
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        failed: false,
      });
    }
  ),
  on(
    locationActions.doFetchStateSuccess,
    (_state, { state }) => {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        failed: false,
        data: state,
      });
    }
  ),
  on(
    locationActions.doFetchStateFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: StateDetailState | undefined, action: Action) {
  return createStateDetailReducers(state, action);
}
