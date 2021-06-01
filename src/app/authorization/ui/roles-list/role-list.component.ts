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
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { Role } from '@app/authorization/models/role.model';
import { ListingControlsComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';

@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent
  extends ListingControlsComponent<Role, SearchRoleForm>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;
  searchModel = '';
  selectedRoles: Role[] = [];

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  registerEvents() {
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((data: Role[]) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFetchMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchRoleForm>(
      new SearchRoleForm()
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
    this._sandbox.fetchRoles(this.criteria);
  }

  delete() {}

  onSelect({ selected }) {
    this.selectedRoles.splice(0, this.selectedRoles.length);
    this.selectedRoles.push(...selected);
  }

  onActivate(event) {}
}
