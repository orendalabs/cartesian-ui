import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import {
  HttpService,
  POST,
  GET,
  Body,
  DefaultHeaders,
  Adapter
} from '@cartesian-ui/ng-axis';
import {
  LoginForm,
  RegisterForm
} from '../../models';
import { AccountAdapter} from "../adapters/account.adapter";

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class AccountHttpService extends HttpService {

  /**
   * Submits login form to the server
   *
   * @param form
   */
  @POST("/clients/web/admin/login")
  @Adapter(AccountAdapter.AccountAdapter)
  public login(@Body form: LoginForm): Observable<any> { return null; };


  /**
   * Submits login form to the server
   *
   * @param form
   */
  @GET("/user/profile")
  @Adapter(AccountAdapter.userAdapter)
  public fetchUser(): Observable<any> { return null; };


  /**
   * Submits register form to the server
   *
   * @param form
   */
  @POST("/account/register")
  @Adapter(AccountAdapter.userAdapter)
  public register(@Body form: RegisterForm): Observable<any> { return null; };

  /**
   * Logs out current user
   */
  @POST("/account/logout")
  public logout(): Observable<any> { return null; };
}
