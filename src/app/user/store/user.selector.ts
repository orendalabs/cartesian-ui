/* tslint:disable:max-line-length */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { UserState } from './user.reducer';
import { State } from '@app/app.store';

export const getUserState = createFeatureSelector<State, UserState>('user');
export const getUserLoaded: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.loaded
);
export const getUserLoading: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.loading
);
export const getUserFailed: MemoizedSelector<object, boolean> = createSelector(
  getUserState,
  (state: UserState) => state.failed
);
export const getUserList: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.list
);
export const getUserSelected: MemoizedSelector<object, object> = createSelector(
  getUserState,
  (state: UserState) => state.selected
);
/* tslint:enable:max-line-length */
