import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchPermissionForm } from '@app/authorization/models/form/search-permission.model';
import { ManagePermissionForm } from '@app/authorization/models/manage/permission.model';
import { Permission } from '@app/authorization/models/permission.model';
import { Role } from '@app/authorization/models/role.model';
import { ListingControlsComponent } from '@app/core/ui';
import { FormHelper } from '@app/shared/helpers';
import { TypeaheadItemListHelper } from '@app/shared/helpers/typeahead.helper';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { isObject } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'role-detail',
  templateUrl: './role-detail.component.html',
})
export class RoleDetailComponent extends TypeaheadItemListHelper<Permission> implements OnInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  roleId: string;
  role;

  permissionCriteria = new RequestCriteria<SearchPermissionForm>(new SearchPermissionForm())

  subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    protected _sandbox: AuthorizationSandbox) {
    super()
    this.control = new FormControl('', [
      Validators.required,
      FormHelper.inValidator(this.typeaheadData),
    ]);
  }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchRoleById(this.roleId);
    this.fetchPermissions();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.roleId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFetchData$.subscribe((role: Role) => {
        if (role) {
          this.role = role;
          this.addedItems = role.permissions.data;
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((perms: Permission[]) => {
        this.items = perms;
        this.typeaheadData = perms.map((perm) => perm.name);
        if (this.role) {
          this.resetValidators();
        }
      })
    );
  }

  deleteRole = (id: string) => {
    const confirmation = confirm(
      'Are you sure you want to delete the role with ID: ' + id
    );
    if (confirmation) {
      this._sandbox.deleteRoleById(id);
    }
  };

  fetchPermissions() {
    this._sandbox.fetchPermissions(this.permissionCriteria);
  }

  addPermission() {
    const n = this.control.value;
    this.addItem(Permission.getPermissionByName(n, this.items));
    this.cdr.detectChanges();
  }

  sync() {
    const permsIds = this.addedItems.map((perm) => perm.id)
    const form: ManagePermissionForm = {
      roleId: this.roleId,
      permissionsIds: permsIds
    }
    this._sandbox.syncPermissionsOnRole(form);
  }

  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
