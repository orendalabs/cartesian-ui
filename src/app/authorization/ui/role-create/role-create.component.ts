import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { BaseComponent } from '@app/core/ui';
import { CreateRoleForm } from '../../models/create/role.model';

@Component({
  selector: 'role-create',
  templateUrl: './role-create.component.html',
})
export class RoleCreateComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    displayName: new FormControl(''),
  });
  constructor(
    injector: Injector,
    private _sandbox: AuthorizationSandbox
  ) {
      super(injector);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unregisterEvents();
  }

  registerEvents() {

  }

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
