import { Component, OnInit } from '@angular/core';
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
import { TypeaheadItemListHelper } from '@app/shared/helpers/typeahead.helper';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent
  extends TypeaheadItemListHelper<Role>
  implements OnInit {
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

  currentTab: 'user' | 'roles' = 'user';

  constructor(
    protected _sandbox: UserSandbox,
    protected route: ActivatedRoute
  ) {
    super();
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
    const roles = this.addedItems.map((role) => role.id);
    const form = new ManageRoleForm({
      userId: this.userId,
      rolesIds: roles,
    });
    this._sandbox.syncRolesOnUser(form);
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
    this.addItem(Role.getRoleByName(this.control.value, this.items));
  }

  removeRole(index: number) {
    this.removeItem(index);
  }
}
