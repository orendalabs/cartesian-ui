import { Action, createReducer, on } from '@ngrx/store';
import { UserListingState } from './user.state';
import * as fromUserActions from './user.action';

const INITIAL_STATE: UserListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: [],
};

const createUserListingReducers = createReducer(
  INITIAL_STATE,
  on(fromUserActions.doFetchUsers, (state) => {
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
      data: users,
    });
  }),
  on(fromUserActions.doFetchUsersFail,(state) => {
      return Object.assign({}, INITIAL_STATE, { failed: true });
  })
);

export function reducer(state: UserListingState | undefined, action: Action) {
  return createUserListingReducers(state, action);
}
