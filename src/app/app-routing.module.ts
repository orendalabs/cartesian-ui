import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '@shared/services';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
