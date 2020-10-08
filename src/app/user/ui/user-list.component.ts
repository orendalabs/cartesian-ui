import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { SearchUserForm } from '../models/form/search-user.model';
import { UserSandbox } from '../user.sandbox';

@Component({
  templateUrl: 'user-list.component.html',
})
export class UserListComponent extends BaseComponent implements OnInit {
  criteria: RequestCriteria<SearchUserForm>;

  constructor(injector: Injector, protected _sandbox: UserSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchUserForm>(new SearchUserForm());
    this.criteria.search.name.value = 'Admin';
    this.criteria.search.email.value = 'admin@admin.com';
    this._sandbox.fetchUsers(this.criteria);
  }
}
