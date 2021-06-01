import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { TenantListComponent } from './ui/tenant-list/tenant-list.component';
import { TenantCreateComponent } from './ui/tenant-create/tenant-create.component';
import { TenantUpdateComponent } from './ui/tenant-update/tenant-update.component';

const routes: Routes = [
  {
    path: '',
    component: TenantComponent,
    children: [
      {
        path: '',
        component: TenantListComponent,
        data: {
          title: 'List',
        },
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: TenantCreateComponent,
        data: {
          title: 'Create',
        },
        pathMatch: 'full',
      },
      {
        path: 'edit/:id',
        component: TenantUpdateComponent,
        data: {
          title: 'Update',
        },
        pathMatch: 'full',
      },
      {
        path: '*',
        redirectTo: 'list',
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantRoutingModule {}
