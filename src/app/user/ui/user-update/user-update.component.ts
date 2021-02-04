import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormHelper } from '@app/account/ui/helpers/form.helper';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { ManageRoleForm } from '@app/authorization/models/manage/role.model';
import { Role } from '@app/authorization/models/role.model';
import { User } from '@app/user/models';
import { EditUserForm } from '@app/user/models/form/edit-user.model';
import { SearchUserForm } from '@app/user/models/form/search-user.model';
import { UserSandbox } from '@app/user/user.sandbox';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { isObject } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
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
  roles: Role[];
  roleNamesTypeahead: string[] = [];

  roleNameControl = new FormControl('', [
    Validators.required,
    FormHelper.inValidator(this.roleNamesTypeahead),
  ]);

  currentTab: 'user' | 'roles' = 'user';

  constructor(
    protected _sandbox: UserSandbox,
    protected _authorizationSandbox: AuthorizationSandbox,
    protected route: ActivatedRoute
  ) {}

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
      this._sandbox.user$.subscribe((user: User) => {
        if (user) {
          this.user = User.fromJS(user);
          if (this.roleNamesTypeahead) {
            this.resetValidators();
          }
        }
      })
    );
    this.subscriptions.push(
      this._authorizationSandbox.rolesFetchData$.subscribe((roles: Role[]) => {
        this.roles = roles;
        this.roleNamesTypeahead = roles.map((role) => role.name);
        if (this.user) {
          this.resetValidators();
        }
      })
    );
  }

  // TODO: find out a way to attach ?include=roles to the url through request criteria
  fetchUser() {
    this._sandbox.fetchFilteredUserById(
      this.userId,
      this.userCriteria.with('roles').limit(1)
    );
  }

  fetchRoles() {
    this._authorizationSandbox.fetchRoles(this.roleCriteria);
  }

  sync() {
    const roles = this.user.roles.map((role) => role.id);
    const form = new ManageRoleForm({
      userId: this.userId,
      rolesIds: roles,
    });
    this._authorizationSandbox.syncRolesOnUser(form);
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
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }

  switchTab(to) {
    this.currentTab = to;
  }

  addRole() {
    if (this.roleNameControl.valid) {
      this.user.roles.push(
        Role.getRoleByName(this.roleNameControl.value, this.roles)
      );
      this.roleNameControl.reset();
      this.resetValidators();
    }
  }

  removeRole(index: number) {
    this.user.roles.splice(index, 1);
  }

  resetValidators() {
    this.roleNameControl.setValidators([
      Validators.required,
      FormHelper.inValidator(this.roleNamesTypeahead),
      FormHelper.notInValidator(this.user.roles.map((role) => role.name)),
    ]);
  }
}
