import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { ManageRoleForm } from '@app/authorization/models/manage/role.model';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { Role } from '@app/authorization/models/role.model';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'role-manage',
  templateUrl: './role-manage.component.html'
})
export class RoleManageComponent implements OnInit {

  subscriptions: Subscription[] = []
  roles: Array<Role>;
  assignFormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required)
  });

  revokeFormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    roleId: new FormControl('', Validators.required)
  });

  constructor(public _sandbox: AuthorizationSandbox) {
    this.registerEvents()
    this.loadRoles();
  }

  loadRoles() {
    this._sandbox.fetchRoles(new RequestCriteria(new SearchRoleForm));
  }

  registerEvents() {
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((roles: Role[]) => this.roles = roles)
    )
  }

  unregisterEvents() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  ngOnInit(): void { }

  assign() {
    if (this.assignFormGroup.valid) {
      let form = new ManageRoleForm();
      form.user_id = this.assignFormGroup.controls['userId'].value;
      form.roles_ids = [this.assignFormGroup.controls['roleId'].value];
      this._sandbox.assignRole(form);
    }
  }

  revoke() {
    if (this.revokeFormGroup.valid) {
      let form = new ManageRoleForm();
      form.user_id = this.revokeFormGroup.controls['userId'].value;
      form.roles_ids = [this.revokeFormGroup.controls['roleId'].value];
      this._sandbox.revokeRole(form);
    }
  }

}
