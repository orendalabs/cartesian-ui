import { Action, createReducer, on } from "@ngrx/store";
import { Setting } from "../models/setting.model";
import * as fromSettingActions from './setting.action'
import { SettingDetailState, SettingState } from "./setting.state";

const INITIAL_STATE: SettingDetailState = {
    loading: false,
    loaded: false,
    failed: false,
    data: new Setting(),
};

export const settingFeatureKey = 'setting';

const createSettingReducers = createReducer(
    INITIAL_STATE,
    on(fromSettingActions.doCreateSetting,
        fromSettingActions.doDeleteSetting,
        (state) => Object.assign({}, state, {
            loading: true,
            loaded: false,
            failed: false,
        }
        )),
    on(fromSettingActions.doCreateSettingSuccess,
        fromSettingActions.doDeleteSettingSuccess,
        (state) => Object.assign({}, state, {
            loading: false,
            loaded: true,
            failed: false
        })),
    on(fromSettingActions.doCreateSettingFail,
        fromSettingActions.doDeleteSettingFail,
        (state) => Object.assign({}, INITIAL_STATE, {
            failed: true
        })
    )
)

export const reducer = (state: SettingDetailState | undefined, action: Action) => {
    return createSettingReducers(state, action);
}
