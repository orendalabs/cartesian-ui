import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { TenantFormComponent } from './ui/tenant/tenant-form.component';
import { RegisterComponent } from './ui/register/register.component';
import { AccountComponent } from './account.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        children: [
          { path: 'tenant', component: TenantFormComponent },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
