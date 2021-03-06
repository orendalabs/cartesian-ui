import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchPermissionForm } from '@app/authorization/models/form/search-permission.model';
import { Permission } from '@app/authorization/models/permission.model';
import { ListingControlsComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent
  extends ListingControlsComponent<Permission, SearchPermissionForm>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;
  searchModel = '';
  selectedPermissions: Permission[] = [];

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  registerEvents = () => {
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((data: Permission[]) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFetchMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  };

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchPermissionForm>(
      new SearchPermissionForm()
    ).limit(2);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  search() {
    this.setPage(1);
    if (this.searchModel) {
      this.criteria.where('name', 'like', this.searchModel);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchPermissions(this.criteria);
  }

  protected delete() {}

  onSelect({ selected }) {
    this.selectedPermissions.splice(0, this.selectedPermissions.length);
    this.selectedPermissions.push(...selected);
  }

  onActivate(event) {}
}
