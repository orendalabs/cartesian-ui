import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { accountModuleAnimation } from '@app/core/animations';
import { AccountSandbox } from '../../account.sandbox';
import { LoginForm } from '../../models';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { FormHelper } from '../helpers/form.helper';

@Component({
  selector: 'app-account',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [accountModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, FormHelper.emailValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    remember: new FormControl(false)
  })

  constructor(injector: Injector, public _sandbox: AccountSandbox) {
    super(injector);
  }

  ngOnInit() {

  }

  get multiTenancySideIsTeanant(): boolean {
    // return this._sessionService.tenantId > 0;
    return false;
    // TODO: Check Is mutlti tenancy available, provide option to select/change/enter tenant Id
  }

  get isSelfRegistrationAllowed(): boolean {
    // if (!this._sessionService.tenantId) {
    //   return true; // false
    // }
    return true;
    // TODO: If self registeration is allowed or not
  }

  login(): void {
    if (this.formGroup.valid) {
      let form = new LoginForm();
      form.email = this.formGroup.controls['email'].value;
      form.password = this.formGroup.controls['password'].value;
      //form.remember = this.formGroup.controls['remember'].value;
      this._sandbox.authenticate(form);
    }
  }

  getFormClasses = (e: AbstractControl): string => {
    return FormHelper.getFormClasses(e);
  }
}