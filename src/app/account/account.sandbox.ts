import { Injectable } 	 from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription }  from "rxjs";
import {
  ValidationService
}                        from '@cartesian-ui/ng-axis';
import { AuthService }   from './shared/services/auth.service';
import {
  User,
  LoginForm,
  RegisterForm
}                        from '@shared/models';
import { Sandbox } 			 from '@shared/base.sandbox';
import {
  State,
  getLoggedUser,
  getAuthenticated,
  getAuthLoading,
  getAuthLoaded
}   	                   from '@app/app.store';
import { actions }       from '@app/account';


@Injectable()
export class AccountSandbox extends Sandbox {

  public loggedUser$   = this.store.pipe(select(getLoggedUser));
  public isAuthenticated$ = this.store.pipe(select(getAuthenticated));
  public loginLoading$ = this.store.pipe(select(getAuthLoading));
  public loginLoaded$  = this.store.pipe(select(getAuthLoaded));


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected store: Store<State>,
    public _authService: AuthService,
    public validationService: ValidationService
  ) {
    super(store);
    this.registerAuthEvents();
  }

  /**
   * Dispatches login action
   *
   * @param form
   */
  public login(form: any): void {
    this.store.dispatch(actions.doLoginAction( { loginForm: new LoginForm(form) }));
  }

  /**
   * Dispatches register action
   *
   * @param form
   */
  public register(form: any): void {
    this.store.dispatch(actions.doRegisterAction( { registerForm: new RegisterForm(form) }));
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {

    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push(this.isAuthenticated$.subscribe((authenticated: any) => {
      if(authenticated.status === true){
        this.store.dispatch(actions.fetchUserAction());
        this._authService.processAuthenticateResult(authenticated.token);
      }
    }));

    // Subscribes to fetch user data and save/remove it from the local storage
    this.subscriptions.push(this.loggedUser$.subscribe((user: User) => {
      if (user.isLoggedIn)
        user.save();
      else
        user.remove();
    }));
  }
}
