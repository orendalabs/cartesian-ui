import {
  Component,
  Injector,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Tenant } from '@app/account/models';
import { ListingControlsComponent } from '@app/core/ui';
import { SearchTenantForm } from '@app/tenant/models/form';
import { TenantSandbox } from '@app/tenant/tenant.sandbox';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
@Component({
  templateUrl: 'tenant-list.component.html',
})
export class TenantListComponent
  extends ListingControlsComponent<Tenant, SearchTenantForm>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  selected = 'all';
  selectedTenants: Tenant[] = [];
  searchModel = '';

  constructor(
    injector: Injector,
    public _sandbox: TenantSandbox,
    protected router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchTenantForm>(
      new SearchTenantForm()
    ).limit(2);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  onDropDownChange(event) {
    const el = event.target;
    this.selected = el.value;
    el.blur();
    this.list();
  }

  search() {
    this.setPage(1);
    if (this.searchModel) {
      this.criteria.where('name', 'like', this.searchModel);
    } else {
      this.criteria.where('name', 'like', '');
    }
    this.list();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchTenants(this.criteria);
  }

  delete() {
    if (this.selectedTenants.length > 0) {
      // do deletion stuff
    }
  }

  edit() {
    const url = 'edit';
    if (this.selectedTenants.length > 0) {
      this.router.navigate([this.router.url, url, this.selectedTenants[0].id]);
    }
  }

  protected registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.tenants$.subscribe((data: any) => {
        this.data = Object.values(data);
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.tenantsMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  onSelect({ selected }) {
    this.selectedTenants.splice(0, this.selectedTenants.length);
    this.selectedTenants.push(...selected);
  }

  onActivate(event) {

  }
}
