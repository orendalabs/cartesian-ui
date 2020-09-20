import { createSelector, createFeatureSelector, MemoizedSelector } from "@ngrx/store";
import { AuthToken, Tenant, User } from '@app/account/models';
import { AccountState } from '@app/account/store';



export interface State {
  account: AccountState
}


/**
 * Auth store functions
 */
export const getAccountState   = createFeatureSelector<State, AccountState>('account');

export const getAuthLoaded : MemoizedSelector<object, boolean>  = createSelector(getAccountState, (state: AccountState) => state.loaded);
export const getAuthLoading : MemoizedSelector<object, boolean> = createSelector(getAccountState, (state: AccountState) => state.loading);
export const getAuthFailed : MemoizedSelector<object, boolean>  = createSelector(getAccountState, (state: AccountState) => state.failed);
export const getAuthToken : MemoizedSelector<object, AuthToken> = createSelector(getAccountState, (state: AccountState) => state.authenticated.token);
export const getAuthenticatedUser : MemoizedSelector<object, User>    = createSelector(getAccountState, (state: AccountState) => state.user);
export const getAuthenticatedTenant : MemoizedSelector<object, Tenant>= createSelector(getAccountState, (state: AccountState) => state.tenant);
export const getAuthenticated : MemoizedSelector<object, object>= createSelector(getAccountState, (state: AccountState) => state.authenticated);
