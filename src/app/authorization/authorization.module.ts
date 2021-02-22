import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { RoleListComponent } from './ui/roles-list/role-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducers } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effect';
import { AuthHttpService } from './shared/auth-http.service';
import { AuthorizationSandbox } from './authorization.sandbox';
import { PermissionListComponent } from './ui/permission-list/permission-list.component';
import { RoleDetailComponent } from './ui/role-detail/role-detail.component';
import { RoleCreateComponent } from './ui/role-create/role-create.component';
import { PermissionDetailComponent } from './ui/permission-detail/permission-detail.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RoleDetailPermissionsComponent } from './ui/role-detail/role-detail-permissions/role-detail-permissions.component';

@NgModule({
  declarations: [
    AuthorizationComponent,
    RoleListComponent,
    RoleCreateComponent,
    PermissionListComponent,
    RoleDetailComponent,
    PermissionDetailComponent,
    RoleDetailPermissionsComponent,
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TypeaheadModule,
    FormsModule,
    StoreModule.forFeature(authFeatureKey, authReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthHttpService, AuthorizationSandbox],
})
export class AuthorizationModule {}
