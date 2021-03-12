import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { SearchPermissionForm } from '@app/authorization/models/form/search-permission.model';
import { ManagePermissionForm } from '@app/authorization/models/manage/permission.model';
import { Permission } from '@app/authorization/models/permission.model';
import { Role } from '@app/authorization/models/role.model';
import { FormHelper } from '@app/shared/helpers';
import { TypeaheadControlsComponent } from '@app/core/ui/components/typeahead-controls.component';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'role-detail',
  templateUrl: './role-detail.component.html',
})
export class RoleDetailComponent
  extends TypeaheadControlsComponent<Permission>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rolePermissionsComponent') rolePermissionsComponent: ElementRef;
  @ViewChild('detailCard') detailCard: ElementRef;
  roleId: string;
  role;
  loaded;
  loading;
  failed;

  permissionsLoading: boolean;
  permissionsLoaded: boolean;
  permissionsFailed: boolean;
  permissionLoading: boolean;
  permissionLoaded: boolean;
  permissionFailed: boolean;
  permissionCriteria = new RequestCriteria<SearchPermissionForm>(
    new SearchPermissionForm()
  );

  subscriptions: Subscription[] = [];

  constructor(
    protected injector: Injector,
    protected route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    protected _sandbox: AuthorizationSandbox
  ) {
    super(injector);
    this.control = new FormControl('', [
      Validators.required,
      FormHelper.inValidator(this.typeaheadData),
    ]);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.registerEvents();
    this._sandbox.fetchRoleById(this.roleId);
    this.fetchPermissions();
  }

  ngOnDestroy() {
    this.unregisterEvents();
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
    this.subscriptions.push(
      this._sandbox.roleLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.failed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.permissionsLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.permissionsLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.permissionsFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoading$.subscribe((loading) => {
        if (loading && this.permissionLoading != undefined) {
          this.notify.info("Updating permissions");
        }
        this.permissionLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoaded$.subscribe((loaded) => {
        if (loaded && this.permissionLoaded != undefined) {
          this.notify.success("Permissions updated", "Success!");
        }
        this.permissionLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFailed$.subscribe((failed) => {
        if (failed && this.permissionFailed != undefined) {
          this.notify.error("Could not update permissions", "Error!");
        }
        this.permissionFailed = failed;
      })
    );
  }

  fetchPermissions() {
    this._sandbox.fetchPermissions(this.permissionCriteria);
  }

  addPermission() {
    const n = this.control.value;
    this.addItem(Permission.getPermissionByName(n, this.items));
    this.cdr.detectChanges();
  }

  sync() {
    const permsIds = this.addedItems.map((perm) => perm.id);
    const form: ManagePermissionForm = {
      roleId: this.roleId,
      permissionsIds: permsIds,
    };
    this._sandbox.syncPermissionsOnRole(form);
  }
}
