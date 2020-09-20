import { MultiTenancyService } from '@cartesian-ui/ng-axis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "@cartesian-ui/ng-axis";
import {
    ApplicationInfoDto,
    TenantLoginInfoDto,
    UserLoginInfoDto
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: "root"
})
export class SessionService {

    private _user: UserLoginInfoDto;
    private _tenant: TenantLoginInfoDto;
    private _application: ApplicationInfoDto;
    private _multiTenancyService: MultiTenancyService

    constructor(
      private _httpClient: HttpClient
    ) {

    }

    init(): Promise<boolean> {
      const token    = axis.auth.getToken();
      const tenantId = axis.multiTenancy.getTenantIdCookie()

      const requestHeaders = {};

      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      if (tenantId) {
        requestHeaders['Axis.TenantId'] = `${tenantId}`;
      }

      return new Promise<boolean>((resolve, reject) => {
        this._httpClient
          .get<any>(
            `v1/user/profile`,
            { headers: requestHeaders }
          )
          .toPromise()
          .then(
            (result: any) => {
              // this._application = result.application;
              this._user = result.data;
              // this._tenant = result.tenant;
              resolve(true);
            },
            (err) => {
              reject(err);
            }
          )
      });

      // this._AccountHttpService.fetchUser().toPromise().then((result: any) => {
      //   this._application = result.application;
      //   this._user = result.user;
      //   this._tenant = result.tenant;
      //
      //   resolve(true);
      // }, (err) => {
      //   reject(err);
      // });

    }

    get application(): ApplicationInfoDto {
        return this._application;
    }

    get user(): UserLoginInfoDto {
        return this._user;
    }

    get userId(): number {
        return this.user ? this.user.id : null;
    }

    get tenant(): TenantLoginInfoDto {
        return this._tenant;
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    getShownLoginName(): string {
        const userName = this._user.userName;

        // if (!this._multiTenancyService.isEnabled) {
        //     return userName;
        // }

        // return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;

      return userName;
    }

    changeTenantIfNeeded(tenantId?: number): boolean {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }

        axis.multiTenancy.setTenantIdCookie(tenantId);
        location.reload();
        return true;
    }

    private isCurrentTenant(tenantId?: number) {
        if (!tenantId && this.tenant) {
            return false;
        } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }

        return true;
    }
}
