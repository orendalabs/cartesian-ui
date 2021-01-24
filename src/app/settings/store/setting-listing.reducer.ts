import { Action, createReducer, on } from "@ngrx/store";
import { Setting } from "../models/setting.model";
import * as settingActions from './setting.action'
import { SettingDetailState, SettingListingState } from "./setting.state";

const INITIAL_STATE: SettingListingState = {
    loading: false,
    loaded: false,
    failed: false,
    data: {
        data: [],
        meta: null
    },
};

export const settingFeatureKey = 'setting';

const createSettingReducers = createReducer(
    INITIAL_STATE,
    on(settingActions.doFetchSettings,
        (state) => Object.assign({}, state, {
            loading: true,
            loaded: false,
            failed: false,
        })
    ),
    on(settingActions.doFetchSettingsSuccess,
        (state, { settings }) => Object.assign({}, state, {
            loading: false,
            loaded: true,
            failed: false,
            data: settings
        })
    ),
    on(settingActions.doFetchSettingsFail,
        (state) => Object.assign({}, INITIAL_STATE, {
            failed: true
        })
    )
)


export const reducer = (state: SettingListingState | undefined, action: Action) => {
    return createSettingReducers(state, action);
}
