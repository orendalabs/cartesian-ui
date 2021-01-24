import { Injectable } from "@angular/core";
import { State } from "@app/app.store";
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Setting } from "../models/setting.model";
import { SettingHttpService } from "../shared/setting-http.service";
import * as fromSettingActions from './setting.action';
import { SettingListingState } from "./setting.state";


@Injectable()
export class SettingEffects {
    constructor(
        private actions$: Actions,
        private settingHttpService: SettingHttpService,
        private store: Store<State>
    ) { }

    doCreateSetting$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromSettingActions.doCreateSetting),
            map((action) => action.settingForm),
            switchMap((settingForm) =>
                this.settingHttpService.createSetting(settingForm).pipe(
                    map(() => { return fromSettingActions.doCreateSettingSuccess() }),
                    catchError((error) => of(fromSettingActions.doCreateSettingFail(error)))
                )
            )
        )
    }
    )

    doFetchSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSettingActions.doFetchSettings),
            map((action) => action.requestCriteria),
            switchMap((criteria) =>
                this.settingHttpService.fetchSettings(criteria).pipe(
                    map((results) => fromSettingActions.doFetchSettingsSuccess({ settings: results })),
                    catchError((error) => of(fromSettingActions.doFetchSettingsFail(error)))
                )
            )
        )
    )

    doUpdateSetting$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromSettingActions.doUpdateSetting),
            map((action) => action.updateForm),
            switchMap((form) =>
                this.settingHttpService.updateSetting(form).pipe(
                    map(() => { return fromSettingActions.doUpdateSettingSuccess() }),
                    catchError((error) => of(fromSettingActions.doUpdateSettingFail(error)))
                )
            )
        )
    }
    )

    doDeleteSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSettingActions.doDeleteSetting),
            map((action) => action.form),
            switchMap((form) =>
                this.settingHttpService.deleteSetting(form).pipe(
                    map(() => fromSettingActions.doDeleteSettingSuccess()),
                    catchError((error) => of(fromSettingActions.doDeleteSettingFail(error)))
                )
            )
        )
    )

    /* doCreateSettingFail$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromSettingActions.doCreateSettingFail),
            map((action) => action.error),
            switchMap((error) => {
                console.log(error);
                return of(null);
            }
            )
        )
    }
    ) */
}