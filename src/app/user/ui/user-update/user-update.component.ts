import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormHelper } from '@shared/helpers';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { ManageRoleForm } from '@app/authorization/models/manage/role.model';
import { Role } from '@app/authorization/models/role.model';
import { User } from '@app/user/models';
import { EditUserForm } from '@app/user/models/form/edit-user.model';
import { SearchUserForm } from '@app/user/models/form/search-user.model';
import { UserSandbox } from '@app/user/user.sandbox';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';
import { TypeaheadControlsComponent } from '@app/core/ui/components/typeahead-controls.component';
import { ListHelper } from '@app/shared/helpers/list.helper';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent
  extends TypeaheadControlsComponent<Role>
  implements OnInit, OnDestroy {
  @ViewChild('userRolesComponent') userRolesComponent: ElementRef;

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  updatingRoles: boolean = false;
  updatingDetail: boolean = false;

  loading: boolean;
  loaded: boolean;
  failed: boolean;
  roleCriteria = new RequestCriteria<SearchRoleForm>(new SearchRoleForm());
  userCriteria = new RequestCriteria<SearchUserForm>(new SearchUserForm());
  subscriptions: Array<Subscription> = [];

  userId: string;
  user: User;

  constructor(
    protected injector: Injector,
    protected _sandbox: UserSandbox,
    protected route: ActivatedRoute
  ) {
    super(injector);
    this.control = new FormControl('', [
      Validators.required,
      FormHelper.inValidator(this.typeaheadData),
    ]);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.fetchUser();
    this.fetchRoles();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.userId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.user$.subscribe((user: any) => {
        if (user) {
          this.user = User.fromJSON(user);
          const roles = [];
          if (user.roles) {
            for (const i in user.roles.data) {
              if (user.roles.data.hasOwnProperty(i)) {
                roles.push(user.roles.data[i]);
              }
            }
          }
          this.addedItems = roles;
          if (this.typeaheadData) {
            this.resetValidators();
          }
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((roles: Role[]) => {
        this.items = roles;
        this.typeaheadData = roles.map((role) => role.name);
        if (this.user) {
          this.resetValidators();
        }
      })
    );

    this.subscriptions.push(
      this._sandbox.rolesLoaded$.subscribe((loaded: boolean) => {
        if (loaded) {
          if (this.updatingRoles && this.updatingDetail) {
            this.notify.success('User roles and details updated.', 'Success!');
            this.updatingRoles = false;
            this.updatingDetail = false;
          } else if (this.updatingRoles) {
            this.notify.success('User roles updated.', 'Success!');
            this.updatingRoles = false;
          } else if (this.updatingDetail) {
            this.notify.success('User detail updated.', 'Success!');
            this.updatingDetail = false;
          }
          if (this.user) {
            this.user.roles = this.addedItems;
          }
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesLoading$.subscribe((loading: boolean) => {
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFailed$.subscribe((failed: boolean) => {
        if (failed) {
          if (this.updatingRoles && this.updatingDetail) {
            this.notify.error(
              'Could not update user roles and detail.',
              'Error!'
            );
            this.updatingRoles = false;
            this.updatingDetail = false;
          } else if (this.updatingRoles) {
            this.notify.error('Could not update user roles', 'Error!');
            this.updatingRoles = false;
          } else if (this.updatingDetail) {
            this.notify.error('Could not update user detail.', 'Error!');
            this.updatingDetail = false;
          }
        }
        this.failed = failed;
      })
    );
  }

  fetchUser() {
    this._sandbox.fetchFilteredUserById(
      this.userId,
      this.userCriteria.with('roles').limit(1)
    );
  }

  fetchRoles() {
    this._sandbox.fetchRoles(this.roleCriteria);
  }

  sync() {
    if (this.loading) {
      this.notify.warn("Please wait for the previous request", "Warning!");
      return;
    }
    this.updatingRoles = this.isRoleListChanged();
    this.updatingDetail = this.isUserDataChanged();
    if (this.updatingRoles && this.updatingDetail) {
      if (this.formGroup.valid) {
        this.updateRoles();
        this.update();
        this.notify.info('Updating User and Roles');
      } else {
        this.notify.warn('User details are invalid');
      }
    } else if (this.updatingRoles) {
      this.updateRoles();
    } else if (this.updatingDetail) {
      this.update();
      this.notify.info('Updating User');
    } else {
      this.notify.info('No changes to update');
    }
  }

  updateRoles() {
    const roleIds = this.addedItems.map((role) => role.id);
    const roleNames = this.addedItems.map((role) => role.name);
    const form = new ManageRoleForm({
      userId: this.userId,
      rolesIds: roleIds,
    });
    const message =
      this.addedItems.length === 0
        ? 'Are you sure you want to remove all roles?'
        : 'Are you sure you want to save the following roles?\n\t- ' +
          roleNames.join('\n\t- ');
    this.message.confirm(message, "Confirm Action", (res) => {
      if (res) {
        this._sandbox.syncRolesOnUser(form);
        this.notify.info('Updating Roles');
      }
    });
  }

  update() {
    if (this.formGroup.valid) {
      const form = new EditUserForm({
        name: this.formGroup.controls.name.value,
        password: this.formGroup.controls.password.value,
      });
      this._sandbox.updateUser(this.userId, form);
    }
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.value === '') {
      return '';
    }
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }

  addRole() {
    if (this.loading) {
      this.notify.warn("Please wait for the previous request", "Warning!");
      return;
    }
    this.addItem(Role.getRoleByName(this.control.value, this.items));
  }

  removeRole(index: number) {
    this.removeItem(index);
  }

  isRoleListChanged(): boolean {
    return !ListHelper.compareListData(this.user.roles, this.addedItems, 'id');
  }

  isUserDataChanged(): boolean {
    if (
      this.formGroup.controls.name.value === '' &&
      this.formGroup.controls.password.value === ''
    ) {
      return false;
    } else {
      return true;
    }
  }
}
