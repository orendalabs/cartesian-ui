import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent
  extends TypeaheadControlsComponent<Role>
  implements OnInit {
  @ViewChild('userRolesComponent') userRolesComponent: ElementRef;

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

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
    const shouldUpdateRoles = this.isRoleListChanged();
    const shouldUpdateUser = this.isUserDataChanged();
    if (shouldUpdateRoles && shouldUpdateUser) {
      if (this.formGroup.valid) {
        this.updateRoles();
        this.update();
        alert('Updating User and Roles');
      } else {
        alert('User details are invalid');
      }
    } else if (shouldUpdateRoles) {
      this.updateRoles();
      alert('Updating Roles');
    } else if (shouldUpdateUser) {
      this.update();
      alert('Updating User');
    } else {
      alert('No changes to update');
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
    if (confirm(message)) {
      this._sandbox.syncRolesOnUser(form);
    }
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
    this.addItem(Role.getRoleByName(this.control.value, this.items));
  }

  removeRole(index: number) {
    this.removeItem(index);
  }

  isRoleListChanged(): boolean {
    if (this.user.roles.length !== this.addedItems.length) {
      return true;
    }
    this.user.roles.forEach((role) => {
      if (!this.addedItems.find((item) => item.id === role.id)) {
        return true;
      }
    });
    return false;
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
