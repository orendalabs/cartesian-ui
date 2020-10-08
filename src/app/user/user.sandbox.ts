import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria, ValidationService } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import { User } from './models';
import { actions } from './store';
import { State } from '@app/app.store';
import { UserHttpService } from '@app/user/shared';
import { SearchUserForm } from './models/form/search-user.model';
import { selectors as fromUserSelectors } from './store';

@Injectable()
export class UserSandbox extends Sandbox {
  public userLoading$ = this.store.pipe(
    select(fromUserSelectors.getUserLoading)
  );
  public userLoaded$ = this.store.pipe(select(fromUserSelectors.getUserLoaded));
  public userFailed$ = this.store.pipe(select(fromUserSelectors.getUserFailed));
  public userList$ = this.store.pipe(select(fromUserSelectors.getUserList));

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected store: Store<State>,
    private _router: Router,
    public validationService: ValidationService,
    protected httpService: UserHttpService,
    protected injector: Injector
  ) {
    super(injector);
    this.registerAuthEvents();
  }

  /**
   * Dispatches login action
   *
   * @param LoginForm form AuthUser login form
   */
  public fetchUsers(criteria: RequestCriteria<SearchUserForm>): void {
    this.store.dispatch(actions.doFetchUsers({ requestCriteria: criteria }));
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
    this.subscriptions.push();
  }
}
