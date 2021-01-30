import { Action, createReducer, on } from '@ngrx/store';
import { UserDetailState } from './user.state';
import * as userActions from './user.action';

const INITIAL_STATE: UserDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null,
};

const createUserDetailReducers = createReducer(
  INITIAL_STATE,
  on(userActions.doFetchUser,
    userActions.doFetchAuthenticatedUser,
    userActions.doCreateUser,
    userActions.doUpdateUser, (state) => {
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false,
    });
  }),
  on(userActions.doFetchUserSuccess,
    userActions.doFetchAuthenticatedUserSuccess,
    userActions.doCreateUserSuccess,
    userActions.doUpdateUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      data: user,
    });
  }),
  on(userActions.doFetchUserFail, 
    userActions.doFetchAuthenticatedUserFail,
    userActions.doCreateUserFail,
    userActions.doUpdateUserFail, (state) => {
    return Object.assign({}, INITIAL_STATE, { failed: true });
  })
);

export function reducer(state: UserDetailState | undefined, action: Action) {
  return createUserDetailReducers(state, action);
}
