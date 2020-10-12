import { Action, createReducer, on } from '@ngrx/store';
import { UserListingState } from './user.state';
import * as userActions from './user.action';

const INITIAL_STATE: UserListingState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null,
  },
};

const createUserListingReducers = createReducer(
  INITIAL_STATE,
  on(userActions.doFetchUsers, (state) => {
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false,
    });
  }),
  on(userActions.doFetchUsersSuccess, (state, { users }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      data: users,
    });
  }),
  on(userActions.doFetchUsersFail, (state) => {
    return Object.assign({}, INITIAL_STATE, { failed: true });
  })
);

export function reducer(state: UserListingState | undefined, action: Action) {
  return createUserListingReducers(state, action);
}
