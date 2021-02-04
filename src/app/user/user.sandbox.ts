import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import { SearchUserForm } from './models/form/search-user.model';
import { UserState, userActions, userSelectors } from './store';
import { getAuthToken } from '../account/store/account.selector';
import { AdminUserCreateForm } from './models/form/admin-user.model';
import { EditUserForm } from './models/form/edit-user.model';
import { ManageRoleForm } from '@app/authorization/models/manage/role.model';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';

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
  public profile$ = this.store.pipe(select(userSelectors.getProfile));

  public rolesFetchData$ = this.store.pipe(select(userSelectors.getRolesFetchData))

  private subscriptions: Array<Subscription> = [];

  token$ = this.store.pipe(select(getAuthToken));

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
   * Dispatches fetch admins action
   */
  public fetchAdmins(criteria: RequestCriteria<SearchUserForm>): void {
    this.store.dispatch(
      userActions.doFetchAdmins({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch clients action
   */
  public fetchClients(criteria: RequestCriteria<SearchUserForm>): void {
    this.store.dispatch(
      userActions.doFetchClients({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch user action
   *
   * @param id ID of the user to fetch
   */
  public fetchUserById(id: string): void {
    this.store.dispatch(userActions.doFetchUser({ id }));
  }

  /**
   * Dispatches fetch user action with a request criteria
   *
   * @param id ID of the user to fetch
   * @param criteria Request Criteria
   */
  public fetchFilteredUserById(
    id: string,
    criteria: RequestCriteria<SearchUserForm>
  ): void {
    this.store.dispatch(userActions.doFetchUser({ id, criteria }));
  }

  /**
   * Dispatches delete user action
   *
   * @param id ID of the user to delete
   */
  public deleteUserById(id: string): void {
    this.store.dispatch(userActions.doDeleteUser({ id }));
  }

  /**
   * Dispatches create user action
   *
   * @param form data of the user to create
   */
  public createUser(form: AdminUserCreateForm): void {
    this.store.dispatch(userActions.doCreateUser({ form }));
  }

  /**
   * Dispatches update user action
   *
   * @param id id of the user to edit data of
   * @param form data of the user to edit
   */
  public updateUser(id: string, form: EditUserForm): void {
    this.store.dispatch(userActions.doUpdateUser({ id, form }));
  }

  /**
   * Dispatches fetch profile action
   */
  public fetchProfile(token: string): void {
    this.store.dispatch(userActions.doFetchAuthenticatedUser({ token }));
  }

    /**
   * Dispatches fetch roles action
   */
  public fetchRoles(criteria: RequestCriteria<SearchRoleForm>): void {
    this.store.dispatch(userActions.doFetchRoles({requestCriteria: criteria}));
  }

  /**
   * Dispatches sync roles on user action
   */
  public syncRolesOnUser(form: ManageRoleForm): void {
    this.store.dispatch(userActions.doSyncRoles({ roleForm: form }));
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
  }
}
