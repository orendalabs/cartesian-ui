import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ValidationService } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@shared/base.sandbox';
import { User, LoginForm, RegisterForm } from './models';
import { AuthService } from './shared';
import { actions } from './store';
import {
  State,
  getAuthenticated,
  getAuthLoading,
  getAuthLoaded,
  getAuthFailed,
} from '@app/app.store';

@Injectable()
export class AccountSandbox extends Sandbox {
  public isAuthenticated$ = this.store.pipe(select(getAuthenticated));
  public loginLoading$ = this.store.pipe(select(getAuthLoading));
  public loginLoaded$ = this.store.pipe(select(getAuthLoaded));
  public authFailed$ = this.store.pipe(select(getAuthFailed));

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected store: Store<State>,
    private _router: Router,
    private _accountService: AuthService,
    public validationService: ValidationService,
    protected injector: Injector
  ) {
    super(injector);
    this.registerAuthEvents();
  }

  /**
   * Dispatches login action
   *
   * @param LoginForm form User login form
   */
  public authenticate(form: LoginForm): void {
    this.store.dispatch(actions.doAuthenticateAction({ loginForm: form }));
  }

  /**
   * Dispatches register action
   *
   * @param RegisterForm form User registration form
   */
  public register(form: any): void {
    this.store.dispatch(
      actions.doRegisterAction({ registerForm: new RegisterForm(form) })
    );
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {
    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push(
      this.isAuthenticated$.subscribe((authenticated: any) => {
        if (authenticated.status === true) {
          // This is the only place we are using auth token from state
          // After this it will/should not be used from state
          // account service will save access token in cookie, and it will always be used from there
          // In case of page load we are not maintaining account state
          // SessionService will be used else where to make session persistent
          this._accountService
            .processAuthenticateResult(authenticated.token)
            .then(
              (logged) => {
                if (logged) {
                  this._sessionService.init().then(
                    (user: User) => {
                      if (user) {
                        this.store.dispatch(
                          actions.addAuthenticatedUserAction({ user })
                        );
                        this._router.navigate(['/demo']);
                      }
                    },
                    (err: HttpErrorResponse) => {}
                  );
                }
              },
              (err) => {}
            );
        }
      })
    );
  }
}
