import { Injectable } from "@angular/core";
import { Adapter, Body, Criteria, DefaultHeaders, GET, HttpService, POST, RequestCriteria, DELETE } from "@cartesian-ui/ng-axis";
import { Observable } from "rxjs";
import { SettingForm } from "../models/create/setting.model";
import { SettingDeleteForm } from "../models/delete/setting.model";
import { SettingUpdateForm } from "../models/update/setting-update.model";
import { SettingAdapter } from "./setting.adapter";

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class SettingHttpService extends HttpService {

    /**
     * Submits create setting form to the server
     * @param form The form to be submitted as body
     */
    @POST('/settings')
    public createSetting(@Body form: SettingForm): Observable<any> {
        return null;
    }

    @GET('/settings')
    public fetchSettings(@Criteria criteria: RequestCriteria<any>): Observable<any> {
        return null;
    }

    @POST('/settings/:id')
    public updateSetting(@Body form: SettingUpdateForm): Observable<any> {
        return null;
    }

    @DELETE('/settings/:id')
    public deleteSetting(@Body id: SettingDeleteForm): Observable<any> {
        return null;
    }
}