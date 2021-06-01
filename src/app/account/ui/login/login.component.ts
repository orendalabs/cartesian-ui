import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { accountModuleAnimation } from '@app/core/animations';
import { AccountSandbox } from '../../account.sandbox';
import { LoginForm } from '../../models';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormHelper } from '@shared/helpers/form.helper';

@Component({
  selector: 'app-account',
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      FormHelper.emailValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    remember: new FormControl(false),
  });

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(injector: Injector, public _sandbox: AccountSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.authLoading$.subscribe((loading) => {
        if (loading) {
          this.notify.info('Logging in');
        }
        this.loading = loading;
      }),
      this._sandbox.authLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.notify.success('Login successful', 'Success!');
        }
        this.loaded = loaded;
      }),
      this._sandbox.authFailed$.subscribe((failed) => {
        this.failed = failed;
      })
    );
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
    if (this.loading) {
      this.notify.warn('Please wait for previous request', 'Warning!');
    } else if (this.formGroup.valid) {
      const form = new LoginForm();
      form.email = this.formGroup.controls.email.value;
      form.password = this.formGroup.controls.password.value;
      // form.remember = this.formGroup.controls['remember'].value;
      this._sandbox.authenticate(form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
    }
  }

  getFormClasses = (e: AbstractControl): string => {
    return FormHelper.getFormClasses(e);
  };
}
