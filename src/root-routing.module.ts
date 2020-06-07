import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    // {
    //     path: 'account',
    //     loadChildren: () => import('account/account.module').then(m => m.AccountModule), // Lazy load account module
    //     data: { preload: true }
    // },
    {
        path: 'admin',
        loadChildren: () => import('admin/admin.module').then(m => m.AdminModule), // Lazy load account module
        data: { preload: true }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
