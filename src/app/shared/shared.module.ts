import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService, RouteGuard } from './services';
import { BusyDirective, EqualValidator } from './directives';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BusyDirective, EqualValidator],
  exports: [BusyDirective, EqualValidator],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SessionService,
        // UrlService,
        RouteGuard,
      ],
    };
  }
}
