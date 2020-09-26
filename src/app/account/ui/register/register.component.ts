import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from '@shared/ui';
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';
import { accountModuleAnimation } from '@shared/animations';
import { AuthService } from '../../shared';

@Component({
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()],
})
export class RegisterComponent extends BaseComponent {
  model: RegisterInput = new RegisterInput();
  saving = false;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private authService: AuthService
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['/login']);
          return;
        }

        // Autheticate
        // this.saving = true;
        // this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        // this.authService.authenticateModel.password = this.model.password;
        // this.authService.authenticate(() => {
        //   this.saving = false;
        // });
      });
  }
}
