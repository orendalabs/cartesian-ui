import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from '@app/user/ui/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {},
    children: [
      {
        path: '',
        component: UserListComponent,
        data: {
          title: 'Users',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
