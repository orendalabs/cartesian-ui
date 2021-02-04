import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationSandbox } from '@app/authorization/authorization.sandbox';
import { Role } from '@app/authorization/models/role.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'role-detail',
  templateUrl: './role-detail.component.html',
})
export class RoleDetailComponent implements OnInit {
  roleId: string;
  role;

  subscriptions: Subscription[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected _sandbox: AuthorizationSandbox
  ) {}

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchRoleById(this.roleId);
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.roleId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFetchData$.subscribe((role: Role) => {
        this.role = role;
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
}
