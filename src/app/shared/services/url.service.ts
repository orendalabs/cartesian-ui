import { Injectable } from '@angular/core';
import { AppConstants } from '@cartesian-ui/ng-axis';
import { SessionService } from './session.service';

@Injectable()
export class UrlService {
  static tenancyNamePlaceHolder = '{TENANCY_NAME}';

  constructor(private readonly _sessionService: SessionService) {}

  // get appRootUrl(): string {
  //     if (this._sessionService.tenant) {
  //         return this.getAppRootUrlOfTenant(this._sessionService.tenant.tenancyName);
  //     } else {
  //         return this.getAppRootUrlOfTenant(null);
  //     }
  // }
  //
  // /**
  //  * Returning url ends with '/'.
  //  */
  // getAppRootUrlOfTenant(tenancyName?: string): string {
  //     let baseUrl = this.ensureEndsWith(AppConstants.appBaseUrl, '/');
  //
  //     if (baseUrl.indexOf(UrlService.tenancyNamePlaceHolder) < 0) {
  //         return baseUrl;
  //     }
  //
  //     if (baseUrl.indexOf(UrlService.tenancyNamePlaceHolder + '.') >= 0) {
  //         baseUrl = baseUrl.replace(UrlService.tenancyNamePlaceHolder + '.', UrlService.tenancyNamePlaceHolder);
  //         if (tenancyName) {
  //             tenancyName = tenancyName + '.';
  //         }
  //     }
  //
  //     if (!tenancyName) {
  //         return baseUrl.replace(UrlService.tenancyNamePlaceHolder, '');
  //     }
  //
  //     return baseUrl.replace(UrlService.tenancyNamePlaceHolder, tenancyName);
  // }
  //
  // private ensureEndsWith(str: string, c: string) {
  //     if (str.charAt(str.length - 1) !== c) {
  //         str = str + c;
  //     }
  //
  //     return str;
  // }
  //
  // private removeFromEnd(str: string, c: string) {
  //     if (str.charAt(str.length - 1) === c) {
  //         str = str.substr(0, str.length - 1);
  //     }
  //
  //     return str;
  // }
}
