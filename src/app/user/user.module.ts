import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { UserComponent } from './user.component';
import { UserListComponent } from './ui/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './shared';
import { UserSandbox } from './user.sandbox';
import { HTTP_INTERCEPTORS } from '@node_modules/@angular/common/http';
import { AxisHttpInterceptor } from '@node_modules/@cartesian-ui/ng-axis';

@NgModule({
  imports: [
    FormsModule,
    UserRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [UserComponent, UserListComponent],
  providers: [
    UserHttpService,
    UserSandbox,
    { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
  ],
})
export class UserModule {}
