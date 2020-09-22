import { Component, ChangeDetectionStrategy, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/ui';
import { accountModuleAnimation } from '@shared/animations';
import { AccountSandbox } from '../../account.sandbox';
import { LoginForm } from '../../models';

@Component({
  selector: 'app-account',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [accountModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit {

  form: LoginForm;

  constructor( injector: Injector, public _sandbox: AccountSandbox ) {
    super(injector);
  }

  ngOnInit(){
    this.form = new LoginForm();
  }

  get multiTenancySideIsTeanant(): boolean {
    //return this._sessionService.tenantId > 0;
    return false;
    // TODO: Check Is mutlti tenancy available, provide option to select/change/enter tenant Id
  }

  get isSelfRegistrationAllowed(): boolean {
    // if (!this._sessionService.tenantId) {
    //   return true; // false
    // }
    return true;
    //TODO: If self registeration is allowed or not
  }

  login(): void {
    this._sandbox.login(this.form);
  }
}
