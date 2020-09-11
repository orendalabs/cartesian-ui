import { Injectable, Injector } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AppConstants } from '@cartesian-ui/ng-axis';
import { AppSessionService } from '@shared/services';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient
  ) { }

  init(): () => Promise<boolean> {
    return () => {
      axis.ui.setBusy();
      return new Promise<boolean>((resolve, reject) => {
        AppConstants.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + AppConstants.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          resolve();
          // this.getUserConfiguration(() => {
          //   axis.event.trigger('axis.dynamicScriptsInitialized');
          //   // do not use constructor injection for AppSessionService
          //   const appSessionService = this._injector.get(AppSessionService);
          //   appSessionService.init().then(
          //     (result) => {
          //       axis.ui.clearBusy();
          //       if (this.shouldLoadLocale()) {
          //         const angularLocale = this.convertAxisLocaleToAngularLocale(
          //           axis.localization.currentLanguage.name
          //         );
          //         import(`@angular/common/locales/${angularLocale}.js`).then(
          //           (module) => {
          //             registerLocaleData(module.default);
          //             resolve(result);
          //           },
          //           reject
          //         );
          //       } else {
          //         resolve(result);
          //       }
          //     },
          //     (err) => {
          //       axis.ui.clearBusy();
          //       reject(err);
          //     }
          //   );
          // });
        });
      });
    };
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    this._httpClient
      .get<any>(`${appRootUrl}assets/${environment.appConfig}`, {
        headers: {
          'Axis.TenantId': `${axis.multiTenancy.getTenantIdCookie()}`,
        },
      })
      .subscribe((response) => {
        AppConstants.appBaseUrl = response.appBaseUrl;
        AppConstants.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
        AppConstants.localeMappings = response.localeMappings;

        callback();
      });
  }

  private getUserConfiguration(callback: () => void): void {
    // const cookieLangValue = axis.utils.getCookieValue(
    //   'Axis.Localization.CultureName'
    // );

    const token = axis.auth.getToken();

    const requestHeaders = {
      'Axis.TenantId': `${axis.multiTenancy.getTenantIdCookie()}`,
    };

    // '.AspNetCore.Culture': `c=${cookieLangValue}|uic=${cookieLangValue}`,

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    this._httpClient
      .get<any>(
        `${AppConstants.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`,
        {
          headers: requestHeaders,
        }
      )
      .subscribe((response) => {
        const result = response.result;

        _.merge(axis, result);

        axis.clock.provider = this.getCurrentClockProvider(
          result.clock.provider
        );

        moment.locale(axis.localization.currentLanguage.name);

        if (axis.clock.provider.supportsMultipleTimezone) {
          moment.tz.setDefault(axis.timing.timeZoneInfo.iana.timeZoneId);
        }

        callback();
      });
  }

  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return (
        document.location.protocol + '//' + document.location.hostname + port
      );
    }

    return document.location.origin;
  }

  private shouldLoadLocale(): boolean {
    return (
      axis.localization.currentLanguage.name &&
      axis.localization.currentLanguage.name !== 'en-US'
    );
  }

  private convertAxisLocaleToAngularLocale(locale: string): string {
    if (!AppConstants.localeMappings) {
      return locale;
    }

    const localeMapings = _.filter(AppConstants.localeMappings, { from: locale });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0]['to'];
    }

    return locale;
  }

  private getCurrentClockProvider(
    currentProviderName: string
  ): axis.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return axis.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return axis.timing.utcClockProvider;
    }

    return axis.timing.localClockProvider;
  }
}
