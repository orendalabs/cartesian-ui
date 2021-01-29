import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchPermissionForm } from '@app/authorization/models/form/search-permission.model';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { ManagePermissionForm } from '@app/authorization/models/manage/permission.model';
import { Permission } from '@app/authorization/models/permission.model';
import { Role } from '@app/authorization/models/role.model';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'permission-attach',
  templateUrl: './permission-attach.component.html'
})
export class PermissionAttachComponent implements OnInit {
  @ViewChild('assignForm') viewAssignForm: ElementRef;

  formGroup = new FormGroup({
    roleId: new FormControl('', Validators.required),
    permissionIds: new FormArray([], Validators.required)
  });

  roles = []
  perms = []
  subscriptions: Subscription[] = []
  selectedRole: Role;

  constructor(protected _sandbox: AuthorizationSandbox) {
    this.registerEvents();
    this.loadPerms();
    this.loadRoles();
  }

  ngOnInit(): void {
  }

  registerEvents() {
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((roles: Role[]) => this.roles = roles)
    )
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((perms: Permission[]) => this.perms = perms)
    )
  }

  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  loadRoles() {
    this._sandbox.fetchRoles(new RequestCriteria(new SearchRoleForm));
  }

  loadPerms() {
    this._sandbox.fetchPermissions(new RequestCriteria(new SearchPermissionForm));
  }

  attach() {
    if (this.formGroup.valid) {
      const form = this.getFormFromGroup();
      this._sandbox.attachPermissions(form);
    }
  }

  detach() {
    if (this.formGroup.valid) {
      const form = this.getFormFromGroup();
      this._sandbox.detachPermissions(form);
    }
  }

  getFormFromGroup() {
    const perms = (this.formGroup.controls['permissionIds'] as FormArray).
      controls.map((control) => {
        return control.value;
      })
    const form = new ManagePermissionForm({
      role_id: this.formGroup.controls['roleId'].value,
      permissions_ids: perms
    })
    return form;
  }

  onRoleDropDownChange = (event) => {
    const checkElements = this.viewAssignForm.nativeElement;
    this.selectedRole = Role.getRoleById(event.target.value, this.roles);
    // first element is select, last element is button.
    for (let i = 1; i < checkElements.length - 1; i++) {
      if (this.checkIfPermissionInRole(checkElements[i].name, this.selectedRole)) {
        checkElements[i].checked = true;
        this.addPermToFormGroupArray(checkElements[i].name);
      } else {
        checkElements[i].checked = false;
        this.removePermFromFormGroupArray(checkElements[i].name);
      }
    }
  }

  onCheckChange = (event, id) => {
    if (event.target.checked) {
      this.addPermToFormGroupArray(id);
    } else {
      this.removePermFromFormGroupArray(id);
    }
  }

  addPermToFormGroupArray = (perm_id) => {
    const control = this.formGroup.controls['permissionIds'] as FormArray;
    control.push(new FormControl(perm_id));
  }

  removePermFromFormGroupArray = (perm_id) => {
    const control = this.formGroup.controls['permissionIds'] as FormArray;
    let index = 0;
    (control.value as []).every((val) => {
      if (val == perm_id) {
        return false;
      }
      index++;
      return true;
    })
    control.removeAt(index);
  }

  checkIfPermissionInRole = (permissionId: string, role: Role): boolean => {
    let found = false;
    role.permissions.data.every((perm) => {
      if (permissionId == perm.id) {
        found = true;
        return !found;
      }
      return !found;
    })
    return found;
  }
}
