import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models';
import * as fromUserActions from './user.action';

export interface UserState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  list: User[];
  selected: User | null;
}

const INITIAL_STATE: UserState = {
  loading: false,
  loaded: false,
  failed: false,
  list: [],
  selected: null,
};

const createUserReducers = createReducer(
  INITIAL_STATE,
  on(fromUserActions.doFetchUsers, fromUserActions.doFetchUser, (state) => {
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false,
    });
  }),
  on(fromUserActions.doFetchUsersSuccess, (state, { users }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      list: users,
    });
  }),
  on(fromUserActions.doFetchUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      selected: user,
    });
  }),
  on(
    fromUserActions.doFetchUsersFail,
    fromUserActions.doFetchUserFail,
    (state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
    }
  )
);

export function reducer(state: UserState | undefined, action: Action) {
  return createUserReducers(state, action);
}
