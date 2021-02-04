import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from '@app/user/ui/user-list/user-list.component';
import { UserDetailComponent } from './ui/user-detail/user-detail.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { UserCreateComponent } from './ui/user-create/user-create.component';
import { UserUpdateComponent } from './ui/user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {},
    children: [
      {
        path: '',
        component: UserListComponent,
        pathMatch: 'full',
        data: {
          title: 'Users',
        },
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        pathMatch: 'full',
        data: {
          title: 'Profile',
        },
      },
      {
        path: 'create',
        component: UserCreateComponent,
        pathMatch: 'full',
        data: {
          title: 'Create User',
        },
      },
      {
        path: 'edit/:id',
        component: UserUpdateComponent,
        pathMatch: 'full',
        data: {
          title: 'Edit User',
        },
      },
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          title: 'User Detail',
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
