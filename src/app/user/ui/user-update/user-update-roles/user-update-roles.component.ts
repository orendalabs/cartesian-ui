import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SearchRoleForm } from '@app/authorization/models/form/search-role.model';
import { Role } from '@app/authorization/models/role.model';
import { ListingControlsComponent } from '@app/core/ui';
import { UserSandbox } from '@app/user/user.sandbox';
import { UserUpdateComponent } from '../user-update.component';

@Component({
  selector: 'user-update-roles',
  templateUrl: './user-update-roles.component.html',
})
export class UserUpdateRolesComponent
  extends ListingControlsComponent<Role, SearchRoleForm>
  implements OnInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  @Input() parent: UserUpdateComponent;
  @Input() set roles(r: Role[]) {
    this.data = r;
  }
  
  selectedRoles: Role[] = [];

  constructor(
    protected _sandbox: UserSandbox,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  registerEvents() {}

  revokeRoles() {
    this.delete();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
  }

  protected delete(): void {
    if (this.selectedRoles.length > 0) {
      let deletions = 0;
      this.parent.addedItems = this.data.filter((perm) => {
        const res = this.selectedRoles.indexOf(perm) === -1;
        if (!res) {
          deletions += 1;
        }
        return res;
      });
      this.selectedRoles = [];
      this.parent.resetValidators();
    }
  }

  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSelect({ selected }) {
    this.selectedRoles.splice(0, this.selectedRoles.length);
    this.selectedRoles.push(...selected);
  }

  onActivate(event) {}
}
