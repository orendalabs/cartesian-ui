import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '@app/account/ui/helpers/form.helper';
import { AdminUserCreateForm } from '@app/user/models/form/admin-user.model';
import { UserSandbox } from '@app/user/user.sandbox';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      FormHelper.emailValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(protected _sandbox: UserSandbox) {}

  ngOnInit(): void {}

  create() {
    if (this.formGroup.valid) {
      const form = new AdminUserCreateForm({
        name: this.formGroup.controls.name.value,
        email: this.formGroup.controls.email.value,
        password: this.formGroup.controls.password.value,
      });
      this._sandbox.createUser(form);
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
}
