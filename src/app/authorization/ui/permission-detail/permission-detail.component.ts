import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { Permission } from '@app/authorization/models/permission.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'permission-detail',
  templateUrl: './permission-detail.component.html',
})
export class PermissionDetailComponent implements OnInit {
  permission: Permission = null;
  subscriptions: Subscription[] = [];
  
  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(
    protected _sandbox: AuthorizationSandbox,
    protected route: ActivatedRoute
  ) {
    this.registerEvents();
  }

  ngOnInit(): void {}

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.fetchPerm(params.id);
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFetchData$.subscribe((data: Permission) => {
        this.permission = data;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoading$.subscribe((loading) => {
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoaded$.subscribe((loaded) => {
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFailed$.subscribe((failed) => {
        this.failed = failed;
      })
    );
  }

  fetchPerm = (id: string) => {
    this._sandbox.fetchPermissionById(id);
  };
}
