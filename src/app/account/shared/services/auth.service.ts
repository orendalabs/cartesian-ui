import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@cartesian-ui/ng-axis';
import { TokenService, LogService, UtilsService } from '@cartesian-ui/ng-axis';
import { UrlHelper } from '@shared/helpers/url.helper';
import { AuthToken, LoginForm } from '../../models';

@Injectable()
export class AuthService {
  authenticateModel: LoginForm;
  authenticateResult: AuthToken;
  rememberMe: boolean;

  constructor(
    private _router: Router,
    private _utilsService: UtilsService,
    private _tokenService: TokenService,
    private _logService: LogService
  ) {
    this.clear();
  }

  logout(reload?: boolean): void {
    axis.auth.clearToken();
    axis.utils.setCookieValue(
      AppConstants.authorization.encryptedAuthTokenName,
      undefined,
      undefined,
      axis.appPath
    );
    if (reload !== false) {
      location.href = AppConstants.appBaseUrl;
    }
  }

  public processAuthenticateResult(authenticateResult: AuthToken) {
    this.authenticateResult = authenticateResult;
    return new Promise<boolean>((resolve, reject) => {
      if (authenticateResult.accessToken) {
        this.login(
          authenticateResult.accessToken,
          authenticateResult.refreshToken,
          authenticateResult.expiresIn,
          this.rememberMe,
          () => {
            resolve(true);
          }
        );
      } else {
        this._logService.warn('Unexpected Authenticate Result!');
        resolve(false);
      }
    });
  }

  private login(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    rememberMe: boolean,
    callback
  ): void {
    const tokenExpireDate = rememberMe
      ? new Date(new Date().getTime() + 1000 * expiresIn)
      : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);

    callback();

    // this._utilsService.setCookieValue(
    //     AppConstants.authorization.encryptedAuthTokenName,
    //     accessToken,
    //     tokenExpireDate,
    //     axis.appPath
    // );

    // let initialUrl = UrlHelper.initialUrl;
    // if (initialUrl.indexOf('/login') > 0) {
    //     initialUrl = AppConstants.appBaseUrl;
    // }

    // location.href = initialUrl;
  }

  private clear(): void {
    this.authenticateModel = new LoginForm();
    this.authenticateModel.remember = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
