import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '@shared/services';
import { DefaultLayoutComponent } from '@app/core/ui/components';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('@app/account/account.module').then((m) => m.AccountModule), // Lazy load account module
    data: { preload: true },
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('@app/demo/demo.module').then((m) => m.DemoModule), // Lazy load account module
    canActivate: [RouteGuard],
    data: { preload: true },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [RouteGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@app/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@app/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'authorization',
        loadChildren: () =>
          import('@app/authorization/authorization.module').then(
            (m) => m.AuthorizationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
