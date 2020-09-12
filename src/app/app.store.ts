import { createSelector, createFeatureSelector, MemoizedSelector } from "@ngrx/store";
import { AuthState } from '@app/account';
import { SettingState } from "@app/setting";
import {AuthToken, User} from "@shared/models";

export interface State {
  auth: AuthState,
  setting: SettingState
}


/**
 * Settings store functions
 */
export const getSettingsState      = createFeatureSelector<State, SettingState>('setting');

export const getSelectedLanguage   = createSelector(getSettingsState, (state: SettingState) => state.selectedLanguage);
export const getSelectedCulture    = createSelector(getSettingsState, (state: SettingState) => state.selectedCulture);
export const getAvailableLanguages = createSelector(getSettingsState, (state: SettingState) => state.availableLanguages);


/**
 * Auth store functions
 */
export const getAuthState   = createFeatureSelector<State, AuthState>('auth');

export const getAuthLoaded : MemoizedSelector<object, boolean>  = createSelector(getAuthState, (state: AuthState) => state.loaded);
export const getAuthLoading : MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthState) => state.loading);
export const getAuthFailed : MemoizedSelector<object, boolean>  = createSelector(getAuthState, (state: AuthState) => state.failed);
export const getAuthToken : MemoizedSelector<object, AuthToken> = createSelector(getAuthState, (state: AuthState) => state.authenticated.token);
export const getLoggedUser : MemoizedSelector<object, User>     = createSelector(getAuthState, (state: AuthState) => state.user);
export const getAuthenticated  = createSelector(getAuthState, (state: AuthState) => state.authenticated);
