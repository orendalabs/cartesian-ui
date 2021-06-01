import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { SettingState } from "./setting.state";

export const getSettingState = createFeatureSelector<SettingState>('setting');

export const getSettingCreateSuccess: MemoizedSelector<object, boolean> = createSelector(
    getSettingState,
    (state: SettingState) => state.detail.loaded
)

export const getSettingCreateFail: MemoizedSelector<object, boolean> = createSelector(
    getSettingState,
    (state: SettingState) => state.detail.failed
)

export const getSettingsFetchData: MemoizedSelector<object, object> = createSelector(
    getSettingState,
    (state: SettingState) => state.listing.data.data
)

export const getSettingsFetchMeta: MemoizedSelector<object, object> = createSelector(
    getSettingState,
    (state: SettingState) => state.listing.data.meta
)

export const getSettingDeleteSuccess: MemoizedSelector<object, boolean> = createSelector(
    getSettingState,
    (state: SettingState) => state.detail.loaded
)

export const getSettingDeleteFail: MemoizedSelector<object, boolean> = createSelector(
    getSettingState,
    (state: SettingState) => state.detail.failed
)