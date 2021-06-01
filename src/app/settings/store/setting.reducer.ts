import { ActionReducerMap } from "@ngrx/store";
import { reducer as settingListingReducer } from "./setting-listing.reducer";
import { reducer as settingDetailReducer } from "./setting-detail.reducer";
import { SettingState } from "./setting.state";

export const settingFeatureKey = 'setting';

export const settingReducers: ActionReducerMap<SettingState> = {
    listing: settingListingReducer,
    detail: settingDetailReducer,
};