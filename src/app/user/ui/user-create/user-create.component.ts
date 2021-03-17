import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHelper } from '@shared/helpers';
import { AdminUserCreateForm } from '@app/user/models/form/admin-user.model';
import { UserSandbox } from '@app/user/user.sandbox';
import { BaseComponent } from '@app/core/ui';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
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

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(injector: Injector, protected _sandbox: UserSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.unregisterEvents();
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
    this.subscriptions.push(
      this._sandbox.userLoading$.subscribe((loading) => {
        if (loading && this.loading !== undefined) {
          this.notify.info('Creating user');
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.userLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded !== undefined) {
          this.notify.success('User Created', 'Success!');
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.userFailed$.subscribe((failed) => {
        if (failed && this.failed !== undefined) {
          this.notify.error('User creation failed', 'Error!');
        }
        this.failed = failed;
      })
    );
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }
}
