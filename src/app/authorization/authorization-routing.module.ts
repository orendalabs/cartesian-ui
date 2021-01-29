import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';
import { RoleManageComponent } from './ui/roles-manage/role-manage.component';
import { RoleListComponent } from './ui/roles-list/role-list.component';
import { PermissionAttachComponent } from './ui/permission-assign/permission-attach.component';
import { PermissionListComponent } from './ui/permission-list/permission-list.component';
import { RoleDetailComponent } from './ui/role-detail/role-detail.component';
import { RoleCreateComponent } from './ui/role-create/role-create.component';
import { PermissionDetailComponent } from './ui/permission-detail/permission-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    data: {
      title: "Authorization"
    },
    children: [
      {
        path: '',
        redirectTo: 'roles/list',
        pathMatch: 'full',
      },
      {
        path: 'roles',
        redirectTo: 'roles/list',
        pathMatch: 'full',
      },
      {
        path: 'roles/manage',
        component: RoleManageComponent,
        data: {
          title: "Manage Roles",
        }
      },
      {
        path: 'roles/create',
        component: RoleCreateComponent,
        data: {
          title: "Create Roles",
        }
      },
      {
        path: 'roles/list',
        component: RoleListComponent,
        data: {
          title: "Roles List"
        }
      },
      {
        path: 'roles/:id',
        component: RoleDetailComponent,
        data: {
          title: "Role Detail"
        }
      },
      {
        path: 'permissions',
        redirectTo: 'permissions/list',
        pathMatch: 'full',
      },
      {
        path: 'permissions/list',
        component: PermissionListComponent,
        data: {
          title: "Permissions List"
        }
      },
      {
        path: 'permissions/assign',
        component: PermissionAttachComponent,
        data: {
          title: "Assign Permissions"
        }
      },
      {
        path: 'permissions/:id',
        component: PermissionDetailComponent,
        data: {
          title: "Permission Detail"
        }
      }
    ]
  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AuthorizationRoutingModule { }
