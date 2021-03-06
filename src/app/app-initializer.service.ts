import { Injectable, Injector } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  AppConstants,
  UiService,
  MultiTenancyService,
  TokenService,
} from '@cartesian-ui/ng-axis';
import { SessionService } from '@shared/services';
import { AuthUser } from '@app/account/models';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient,
    private _uiService: UiService,
    private _tokenService: TokenService,
    private _multiTenancyService: MultiTenancyService
  ) {}

  init(): () => Promise<boolean> {
    return () => {
      this._uiService.setBusy();
      return new Promise<boolean>((resolve, reject) => {
        AppConstants.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + AppConstants.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          // this.getUserConfiguration(() => {
          //   axis.event.trigger('axis.dynamicScriptsInitialized');

          // ----------------------------------------------------------
          //            Data flow for App Session Service
          // ----------------------------------------------------------
          // Diversion #1:
          // Rule: General rule is, every thing is controlled through sandbox, sandbox has all features and only access to api services.
          // Exception: app session service is exception to that rule, as it is directly communicating with api

          // Diversion #2:
          // Rule: As redux principle, NgRx Store should be only source of truth, i.e data should flow from store only.
          // Exception: app session is exception to that as well, SessionService holds session data, and it hydrated directly through api.

          // do not use constructor injection for SessionService
          const sessionService = this._injector.get(SessionService);
          sessionService.init().then(
            (user: AuthUser) => {
              this._uiService.clearBusy();
              // TODO: Maintain Session state, for login user
              // I thing that user and tenant property is not required for account state
              // also no need to save auth token
              // this._store.dispatch(actions.doAddAuthenticatedUser({user}))
              if (this.shouldLoadLocale()) {
                const angularLocale = this.convertAxisLocaleToAngularLocale(
                  axis.localization.currentLanguage.name
                );
                import(`@angular/common/locales/${angularLocale}.js`).then(
                  (module) => {
                    registerLocaleData(module.default);
                    resolve(true);
                  },
                  reject
                );
              } else {
                resolve(true);
              }
            },
            (err) => {
              this._uiService.clearBusy();
              resolve(true);
            }
          );
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

  // tslint:disable:no-string-literal
  private getUserConfiguration(callback: () => void): void {
    // ----------------------------------------------------------
    //   TODO: Policy for Axis Object Holding AuthUser Configuration
    // ----------------------------------------------------------
    // Global `axis` javascript object
    // getUserConfiguration: these configurations will remain part of the global axis object, and not be included in app state, because
    // these values will have no impact on state, and these are supposed to be remain constant through application live cycle,
    // so these will not be required to part of state.

    const cookieLangValue = axis.utils.getCookieValue(
      `Axis.Localization.CultureName`
    );
    const token = this._tokenService.getToken();
    const tenantId = this._multiTenancyService.getTenantId();

    const requestHeaders = {};

    if (cookieLangValue) {
      requestHeaders[
        `.Axis.Culture`
      ] = `c=${cookieLangValue}|uic=${cookieLangValue}`;
    }

    if (tenantId) {
      requestHeaders[`Axis.TenantId`] = `${tenantId}`;
    }

    if (token) {
      requestHeaders[`Authorization`] = `Bearer ${token}`;
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

    const localeMapings = _.filter(AppConstants.localeMappings, {
      from: locale,
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0].to;
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
