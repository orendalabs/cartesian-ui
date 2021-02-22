import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { CreateRoleForm } from '../../models/create/role.model';

@Component({
  selector: 'role-create',
  templateUrl: './role-create.component.html',
})
export class RoleCreateComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    displayName: new FormControl(''),
  });
  constructor(protected _sandbox: AuthorizationSandbox) {}

  ngOnInit(): void {}

  create() {
    if (this.formGroup.valid) {
      const form: CreateRoleForm = {
        name: this.formGroup.controls.name.value,
        description: this.formGroup.controls.description.value,
        displayName: this.formGroup.controls.displayName.value,
      };
      console.log(form);
      this._sandbox.createRole(form);
    }
  }
}
