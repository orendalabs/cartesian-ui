import { Injectable, Injector } from "@angular/core";
import { State } from "@app/app.store";
import { Sandbox } from "@app/core/base.sandbox";
import { RequestCriteria } from "@cartesian-ui/ng-axis";
import { select, Store } from "@ngrx/store";
import { request } from "http";
import { SettingForm } from "./models/create/setting.model";
import { SettingDeleteForm } from "./models/delete/setting.model";
import { SearchSettingForm } from "./models/form/search-setting.model";
import { SettingUpdateForm } from "./models/update/setting-update.model";
import * as actions from './store/setting.action'
import * as selectors from './store/setting.selector'

@Injectable()
export class SettingsSandbox extends Sandbox {

    isSettingCreateSuccess$ = this.store.pipe(
        select(selectors.getSettingCreateSuccess)
    )
    isSettingCreateFail$ = this.store.pipe(
        select(selectors.getSettingCreateFail)
    )

    settingsFetchData$ = this.store.pipe(
        select(selectors.getSettingsFetchData)
    )

    settingsFetchMeta$ = this.store.pipe(
        select(selectors.getSettingsFetchMeta)
    )

    isSettingDeleteSuccess$ = this.store.pipe(
        select(selectors.getSettingDeleteSuccess)
    )

    isSettingDeleteFail$ = this.store.pipe(
        select(selectors.getSettingDeleteFail)
    )

    constructor(
        protected store: Store<State>,
        protected injector: Injector
    ) {
        super(injector);
    }

    create(settingForm: SettingForm): void {
        this.store.dispatch(actions.doCreateSetting({ settingForm: settingForm }))
    }

    fetch(requestCriteria: RequestCriteria<SearchSettingForm>): void {
        this.store.dispatch(actions.doFetchSettings({ requestCriteria: requestCriteria }))
    }

    edit(settingUpdateForm: SettingUpdateForm): void {
        //this.store.dispatch(actions.doUpdateSetting({ updateForm: settingUpdateForm }))
    }
    delete(id: number): void {
        let form: SettingDeleteForm = { id: id };
        this.store.dispatch(actions.doDeleteSetting({ form: form }))
    }
}