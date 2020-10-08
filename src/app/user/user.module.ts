import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AxisHttpInterceptor } from '@cartesian-ui/ng-axis';
import { UserComponent } from './user.component';
import { UserListComponent } from './ui/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './shared';
import { UserSandbox } from './user.sandbox';
import { UserEffects, reducer as userReducer } from './store';

@NgModule({
  imports: [
    FormsModule,
    UserRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [UserComponent, UserListComponent],
  providers: [
    UserHttpService,
    UserSandbox,
    { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
  ],
})
export class UserModule {}
