import {
  Component,
  Injector,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { SearchUserForm } from '../../models/form/search-user.model';
import { UserSandbox } from '../../user.sandbox';
import { User } from '../../models';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'user-list.component.html',
  providers: [],
})
export class UserListComponent
  extends ListingControlsComponent<User, SearchUserForm>
  implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  selected = 'all';
  selectedUsers: User[] = [];
  searchModel = '';

  constructor(
    injector: Injector,
    public _sandbox: UserSandbox,
    protected router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchUserForm>(
      new SearchUserForm()
    ).limit(2);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  onDropDownChange(event) {
    const el = event.target;
    this.selected = el.value;
    el.blur();
    this.list();
  }

  search() {
    this.setPage(1);
    if (this.searchModel) this.criteria.where('name', 'like', this.searchModel);
    else this.criteria.where('name', 'like', ''); // TODO: Remove where 
    this.list();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    switch (this.selected) {
      case 'admins':  
        this._sandbox.fetchAdmins(this.criteria);
        break;
      case 'clients':
        this._sandbox.fetchClients(this.criteria);
        break;
      default:
        this._sandbox.fetchUsers(this.criteria);
        break;
    }
  }

  delete() {
    if (this.selectedUsers.length > 0) {
      // do deletion stuff
    }
  }

  edit() {
    const url = 'edit';
    if (this.selectedUsers.length > 0) {
      this.router.navigate([this.router.url, url, this.selectedUsers[0].id]);
    }
  }

  protected registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.users$.subscribe((data: any) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.usersMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSelect({ selected }) {
    this.selectedUsers.splice(0, this.selectedUsers.length);
    this.selectedUsers.push(...selected);
  }

  onActivate(event) {

  }
}
