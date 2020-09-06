import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs';
import {
  HttpService,
  POST,
  GET,
  Body,
  DefaultHeaders,
  Adapter
}                       from '@cartesian-ui/ng-axis';
import {
  LoginForm,
  RegisterForm
}                       from '@shared/models';
import { AuthAdapter} from "../../adapters/auth.adapter";

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class AuthHttpService extends HttpService {

  /**
   * Submits login form to the server
   *
   * @param form
   */
  @POST("/clients/web/admin/login")
  @Adapter(AuthAdapter.authAdapter)
  public login(@Body form: LoginForm): Observable<any> { return null; };


  /**
   * Submits login form to the server
   *
   * @param form
   */
  @GET("/user/profile")
  @Adapter(AuthAdapter.userAdapter)
  public fetchUser(): Observable<any> { return null; };


  /**
   * Submits register form to the server
   *
   * @param form
   */
  @POST("/account/register")
  @Adapter(AuthAdapter.userAdapter)
  public register(@Body form: RegisterForm): Observable<any> { return null; };

  /**
   * Logs out current user
   */
  @POST("/account/logout")
  public logout(): Observable<any> { return null; };
}
