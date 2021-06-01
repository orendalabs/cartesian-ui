import { Setting } from "../models/setting.model";

export interface SettingDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Setting;
}

export interface SettingListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Setting>;
    meta: object;
  };
}

export interface SettingState {
  listing: SettingListingState,
  detail: SettingDetailState
}