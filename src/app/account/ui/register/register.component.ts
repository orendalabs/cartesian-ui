import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from '@app/core/ui';
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';
import { accountModuleAnimation } from '@app/core/animations';
import { AuthService } from '../../shared';

import { AccountSandbox } from '../../account.sandbox';
import { RegisterForm } from '../../models/form/register.model';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormHelper } from '@shared/helpers/form.helper';

@Component({
  selector: 'app-account',
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()],
})
export class RegisterComponent extends BaseComponent {
  formGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      FormHelper.emailValidator(),
    ]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    gender: new FormControl('Gender...', [
      Validators.required,
      FormHelper.genderValidator(),
    ]),
    dob: new FormControl('', [
      Validators.required,
      FormHelper.dateFormatValidator(),
      FormHelper.dobValidator(12),
    ]),
  });
  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private authService: AuthService,
    public _sandbox: AccountSandbox
  ) {
    super(injector);
  }

  save(): void {
    if (this.formGroup.valid) {
      this.saving = true;
      const form = new RegisterForm();
      form.email = this.formGroup.controls.email.value;
      form.name = this.formGroup.controls.name.value;
      form.password = this.formGroup.controls.password.value;
      form.gender = this.formGroup.controls.gender.value;
      form.birth = this.formGroup.controls.dob.value;
      this._sandbox.register(form);
    }

    // this.saving = true;
    // this._accountService
    //  .register(this.model)
    //  .pipe(
    //    finalize(() => {
    //      this.saving = false;
    //    })
    //  )
    //  .subscribe((result: RegisterOutput) => {
    //    if (!result.canLogin) {
    //      this.notify.success(this.l('SuccessfullyRegistered'));
    //      this._router.navigate(['/login']);
    //      return;
    //    }

    // Autheticate
    // this.saving = true;
    // this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
    // this.authService.authenticateModel.password = this.model.password;
    // this.authService.authenticate(() => {
    //   this.saving = false;
    // });
    // });
  }

  getFormClasses = (e: AbstractControl): string => {
    return FormHelper.getFormClasses(e);
  };

  getError = (e: any): string => {
    return FormHelper.getErrorMessage(e);
  };
}
