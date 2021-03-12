import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '@shared/helpers';
import { AdminUserCreateForm } from '@app/user/models/form/admin-user.model';
import { UserSandbox } from '@app/user/user.sandbox';
import { BaseComponent } from '@app/core/ui';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent extends BaseComponent implements OnInit {
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

  loading: boolean = false;

  constructor(protected injector: Injector, protected _sandbox: UserSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

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

  registerEvents() {
    this._sandbox.userLoading$.subscribe((loading) => {
      this.loading = loading;
      this.notify.info("Creating user");
    });
    this._sandbox.userLoaded$.subscribe((loaded) => {
      this.notify.success("User Created", "Success!");
    });
    this._sandbox.userFailed$.subscribe((failed) => {
      this.notify.error("User creation failed", "Error!");
    });
  }
  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }
}
