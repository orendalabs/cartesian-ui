import {
  MultiTenancyService,
  TokenService,
  convertObjectKeysToCamel,
} from '@cartesian-ui/ng-axis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '@shared/models';
import { User, Tenant } from '@app/account/models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _user: User;
  private _tenant: Tenant;
  private _application: Application;

  constructor(
    private _httpClient: HttpClient,
    private _tokenService: TokenService,
    private _multiTenancyService: MultiTenancyService
  ) {}

  // tslint:disable:no-string-literal
  init(): Promise<any> {
    const token = this._tokenService.getToken();
    const tenantId = this._multiTenancyService.getTenantId();

    const requestHeaders = {};

    if (tenantId) {
      requestHeaders['Axis.TenantId'] = `${tenantId}`;
    }

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    return new Promise<any>((resolve, reject) => {
      this._httpClient
        .get<any>(`v1/user/profile`, { headers: requestHeaders })
        .toPromise()
        .then(
          (result: any) => {
            // this._application = result.application;
            this._user = new User(convertObjectKeysToCamel(result.data));
            // this._tenant = result.tenant;
            resolve(this._user);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get application(): Application {
    return this._application;
  }

  get user(): User {
    return this._user;
  }

  get userId(): string {
    return this.user ? this.user.id : null;
  }

  get tenant(): Tenant {
    return this._tenant;
  }

  get tenantId(): string {
    return this.tenant ? this.tenant.id : null;
  }

  getShownLoginName(): string {
    const userName = this._user.email;

    // if (!this._multiTenancyService.isEnabled) {
    //     return userName;
    // }

    // return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;

    return userName;
  }

  changeTenantIfNeeded(tenantId?: string): boolean {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }

    axis.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }

  private isCurrentTenant(tenantId?: string) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }

    return true;
  }
}
