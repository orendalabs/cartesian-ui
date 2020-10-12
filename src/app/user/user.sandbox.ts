import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import { SearchUserForm } from './models/form/search-user.model';
import { UserState, userActions, userSelectors } from './store';

@Injectable()
export class UserSandbox extends Sandbox {
  public usersLoading$ = this.store.pipe(select(userSelectors.getUsersLoading));
  public usersLoaded$ = this.store.pipe(select(userSelectors.getUsersLoaded));
  public usersFailed$ = this.store.pipe(select(userSelectors.getUsersFailed));
  public users$ = this.store.pipe(select(userSelectors.getUsersList));
  public usersMeta$ = this.store.pipe(select(userSelectors.getUsersMeta));

  public userLoading$ = this.store.pipe(select(userSelectors.getUserLoading));
  public userLoaded$ = this.store.pipe(select(userSelectors.getUserLoaded));
  public userFailed$ = this.store.pipe(select(userSelectors.getUserFailed));
  public user$ = this.store.pipe(select(userSelectors.getUserDetail));

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected store: Store<UserState>,
    private _router: Router,
    protected injector: Injector
  ) {
    super(injector);
    this.registerUserEvents();
  }

  /**
   * Dispatches fetch users action
   *
   * @param RequestCriteria<SearchUserForm> form to get user list
   */
  public fetchUsers(criteria: RequestCriteria<SearchUserForm>): void {
    this.store.dispatch(
      userActions.doFetchUsers({ requestCriteria: criteria })
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
  private registerUserEvents(): void {
    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push();
  }
}
