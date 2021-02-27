import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AxisHttpInterceptor } from '@cartesian-ui/ng-axis';
import { userFeatureKey, userReducers, UserEffects } from './store';
import { UserComponent } from './user.component';
import { UserListComponent } from './ui/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './shared';
import { UserSandbox } from './user.sandbox';

import { UserDetailComponent } from './ui/user-detail/user-detail.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { UserCreateComponent } from './ui/user-create/user-create.component';
import { UserUpdateComponent } from './ui/user-update/user-update.component';
import { UserUpdateRolesComponent } from './ui/user-update/user-update-roles/user-update-roles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule,
    TypeaheadModule,
    StoreModule.forFeature(userFeatureKey, userReducers),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    UserProfileComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserUpdateRolesComponent,
  ],
  providers: [
    UserHttpService,
    UserSandbox,
    { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
  ],
})
export class UserModule {}
