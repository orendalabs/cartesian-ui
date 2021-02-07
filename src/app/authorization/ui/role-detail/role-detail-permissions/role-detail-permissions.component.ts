import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchPermissionForm } from '@app/authorization/models/form/search-permission.model';
import { Permission } from '@app/authorization/models/permission.model';
import { ListingControlsComponent } from '@app/core/ui';
import { RoleDetailComponent } from '../role-detail.component';

@Component({
  selector: 'role-detail-permissions',
  templateUrl: './role-detail-permissions.component.html'
})
export class RoleDetailPermissionsComponent extends ListingControlsComponent<Permission, SearchPermissionForm> implements OnInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  constructor(protected _sandbox: AuthorizationSandbox,
    private injector: Injector) {
    super(injector);
  }

  @Input() parent: RoleDetailComponent;
  @Input() set perms(p: Permission[]) {this.data = p}

  ngOnInit(): void {
  }

  registerEvents() {
    
  }

  revokePermissions() {
    this.delete();
  }

  protected list(): void {
    this.resetCheckBoxes();
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
  }

  protected delete(): void {
    if (this.selectedItemIds.length > 0) {
      let deletions = 0;
      this.parent.addedItems = this.data.filter((perm) => {
        const res = this.selectedItemIds.indexOf(perm.id) == -1
        if (!res) deletions += 1;
        return res;
      })
      this.resetCheckBoxes();
      this.parent.resetValidators();
    }
  }

  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
