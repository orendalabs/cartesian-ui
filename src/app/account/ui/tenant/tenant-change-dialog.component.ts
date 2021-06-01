import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseComponent } from '@app/core/ui';
import {
  AppTenantAvailabilityState,
  IsTenantAvailableForm,
  IsTenantAvailableResponse,
} from '@app/account/models';

@Component({
  templateUrl: './tenant-change-dialog.component.html',
})
export class TenantChangeDialogComponent extends BaseComponent {
  saving = false;
  name = '';

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    if (!this.name) {
      this.multiTenancy.setTenantId(undefined);
      this.bsModalRef.hide();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableForm();
    input.name = this.name;

    this.saving = true;
    // this._accountService
    //   .isTenantAvailable(input)
    //   .pipe(
    //     finalize(() => {
    //       this.saving = false;
    //     })
    //   )
    //   .subscribe((result: IsTenantAvailableResponse) => {
    //     switch (result.state) {
    //       case AppTenantAvailabilityState.Available:
    //         this.multiTenancy.setTenantId(result.tenantId);
    //         location.reload();
    //         return;
    //       case AppTenantAvailabilityState.InActive:
    //         this.message.warn(this.l('TenantIsNotActive', this.name));
    //         break;
    //       case AppTenantAvailabilityState.NotFound:
    //         this.message.warn(
    //           this.l('ThereIsNoTenantDefinedWithName{0}', this.name)
    //         );
    //         break;
    //     }
    //   });
  }
}
