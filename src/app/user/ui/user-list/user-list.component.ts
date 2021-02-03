import {
  Component,
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class UserListComponent
  extends ListingControlsComponent<User, SearchUserForm>
  implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  selected = "all";
  selectedItemIds: Array<string> = []
  checkedBoxes = [];

  constructor(injector: Injector, public _sandbox: UserSandbox, protected router: Router) {
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

  protected list(): void {
    this.resetCheckBoxes();
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    switch(this.selected) {
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
    if (this.selectedItemIds.length > 0) {
      // do deletion stuff
    }
  }

  // Add to ListingControlsComponent
  edit() {
    const url = 'edit';
    if (this.selectedItemIds.length > 0) {
      this.router.navigate([this.router.url, url, this.selectedItemIds[0]])
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

  // Checkbox handling functions
  onListItemCheckBoxChange(event, id) {
    if (event.target.checked) {
      this.onCheckItem(event.target, id);
      this.checkedBoxes.push(event.target);
    } else {
      this.onUncheckItem(event.target, id);
    }
  }

  onCheckItem(checkBox: any, id: string) {
    this.selectedItemIds.push(id);
    this.checkedBoxes.push(checkBox);
  }

  onUncheckItem(checkBox: any, id: string) {
    const itemIndex = this.selectedItemIds.indexOf(id);
    const boxIndex = this.checkedBoxes.indexOf(checkBox);
    this.selectedItemIds.splice(itemIndex, 1);
    this.checkedBoxes.splice(boxIndex, 1)
  }

  resetCheckBoxes() {
    this.selectedItemIds = [];
    this.checkedBoxes.forEach((checkBox) => checkBox.checked = false)
  }
}
