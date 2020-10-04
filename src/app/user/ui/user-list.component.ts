import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { SearchUserForm } from '../models/form/search-user.model';
import { UserSandbox } from '../user.sandbox';

@Component({
  templateUrl: 'user-list.component.html',
})
export class UserListComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, protected _sandbox: UserSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    // TODO: try to make RequestCriteria Inject able,
    // also keep in mind as request criteria depends on search from, we may want different instance in very component
    let criteria = new RequestCriteria<SearchUserForm>(new SearchUserForm());
    criteria.search.name.value = 'Admin';
    criteria.search.email.value = 'admin@admin.com';
    // console.log(criteria.build().toString());

    this._sandbox.fetchUsers(criteria);
  }
}
