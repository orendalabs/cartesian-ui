import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AxisHttpInterceptor } from '@cartesian-ui/ng-axis'
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountRoutingModule } from './account-routing.module';

import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {
  AuthService,
  AuthHttpService,
  AccountLanguagesComponent,
  AccountHeaderComponent,
  AccountFooterComponent,
  AuthEffects,
  reducer as authReducer
} from '@app/account';

import { AccountSandbox } from './account.sandbox';

// tenants
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { TenantChangeDialogComponent } from './tenant/tenant-change-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        AccountRoutingModule,
        SharedModule,
        ModalModule.forChild(),
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([ AuthEffects ])
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        AccountLanguagesComponent,
        AccountHeaderComponent,
        AccountFooterComponent,
        // tenant
        TenantChangeComponent,
        TenantChangeDialogComponent,
    ],
    providers: [
        AuthHttpService,
        AccountSandbox,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
    ],
    entryComponents: [
        // tenant
        TenantChangeDialogComponent
    ]
})
export class AccountModule {

}
