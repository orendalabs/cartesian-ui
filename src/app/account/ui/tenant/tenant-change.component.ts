import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { TenantChangeDialogComponent } from './tenant-change-dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'tenant-change',
  templateUrl: './tenant-change.component.html',
})
export class TenantChangeComponent extends BaseComponent implements OnInit {
  name = '';

  constructor(injector: Injector, private _modalService: BsModalService) {
    super(injector);
  }

  get isMultiTenancyEnabled(): boolean {
    return this.multiTenancy.isEnabled;
  }

  ngOnInit() {
    if (this.appSession.tenant) {
      this.name = this.appSession.tenant.name;
    }
  }

  showChangeModal(): void {
    const modal = this._modalService.show(TenantChangeDialogComponent);
    if (this.appSession.tenant) {
      modal.content.name = this.appSession.tenant.name;
    }
  }
}
