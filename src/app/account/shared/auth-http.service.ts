import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpService,
  POST,
  GET,
  Body,
  DefaultHeaders,
  Adapter,
} from '@cartesian-ui/ng-axis';
import { IsTenantAvailableForm, LoginForm, RegisterForm } from '../models';
import { AccountAdapter } from './account.adapter';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class AuthHttpService extends HttpService {
  /**
   * Submits login form to the server
   *
   * @param LoginForm form AuthUser login form
   */
  @POST('/clients/web/login')
  @Adapter(AccountAdapter.accountAdapter)
  public login(@Body form: LoginForm): Observable<any> {
    return null;
  }

  /**
   * Submits login form to the server
   *
   */
  @GET('/user/profile')
  @Adapter(AccountAdapter.userAdapter)
  public fetchUser(): Observable<any> {
    return null;
  }

  /**
   * Submits register form to the server
   *
   * @param RegisterForm form AuthUser registration form
   */
  @POST('/register')
  @Adapter(AccountAdapter.userAdapter)
  public register(@Body form: RegisterForm): Observable<any> {
    return null;
  }

  /**
   * Submits Tenant Availability Form
   *
   * @param IsTenantAvailableForm form Form submitted to check tenant availability
   */
  @POST('/clients/web/admin/login')
  @Adapter(AccountAdapter.accountAdapter)
  public isTenantAvailable(@Body form: IsTenantAvailableForm): Observable<any> {
    return null;
  }

  /**
   * Logs out current user
   */
  @POST('/account/logout')
  public logout(): Observable<any> {
    return null;
  }
}
