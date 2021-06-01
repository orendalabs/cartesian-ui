import { createAction, props } from '@ngrx/store';
import { Setting } from '../models/setting.model';
import { type, RequestCriteria } from '@cartesian-ui/ng-axis';
import { SettingForm } from '../models/create/setting.model';
import { SearchSettingForm } from '../models/form/search-setting.model';
import { SettingUpdateForm } from '../models/update/setting-update.model';
import { SettingDeleteForm } from '../models/delete/setting.model';

/**
 * Fetch Settings Actions
 */
export const doFetchSettings = createAction(
    type('[Setting] Do Fetch Settings'),
    props<{ requestCriteria: RequestCriteria<SearchSettingForm> }>()
);
export const doFetchSettingsSuccess = createAction(
    type('[Setting] Do Fetch Settings Success'),
    props<{ settings: Setting[] }>()
);
export const doFetchSettingsFail = createAction(
    type('[Setting] Do Fetch Settings Fail'),
    props<{ error: any }>()
);

/**
 * Create Setting Actions
 */
export const doCreateSetting = createAction(
    type('[Setting] Do Create Setting'),
    props<{ settingForm: SettingForm }>()
)
export const doCreateSettingSuccess = createAction(
    type('[Setting] Do Create Setting Success')
)
export const doCreateSettingFail = createAction(
    type('[Setting] Do Create Setting Fail'),
    props<{ error: any }>()
)

/**
 * Fetch Settings Actions
 */
export const doUpdateSetting = createAction(
    type('[Setting] Do Update Settings'),
    props<{ updateForm: SettingUpdateForm }>()
);
export const doUpdateSettingSuccess = createAction(
    type('[Setting] Do Update Settings Success')
);
export const doUpdateSettingFail = createAction(
    type('[Setting] Do Update Settings Fail'),
    props<{ error: any }>()
);

/**
 * Delete Setting Actions
 */
export const doDeleteSetting = createAction(
    type('[Setting] Do Delete Setting'),
    props<{ form: SettingDeleteForm }>()
)
export const doDeleteSettingSuccess = createAction(
    type('[Setting] Do Delete Setting Success')
)
export const doDeleteSettingFail = createAction(
    type('[Setting] Do Delete Setting Fail'),
    props<{ error: any }>()
)