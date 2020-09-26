import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutStoreService } from './ui';
import {
  AppPaginationControlsComponent,
  AppValidationSummaryComponent,
  AppModalHeaderComponent,
  AppModalFooterComponent,
} from './ui/components';
import { SessionService, RouteGuard } from './services';
import { BusyDirective, EqualValidator } from './directives';
import { LocalizePipe } from './pipes';

@NgModule({
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  declarations: [
    AppPaginationControlsComponent,
    AppValidationSummaryComponent,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator,
  ],
  exports: [
    AppPaginationControlsComponent,
    AppValidationSummaryComponent,
    AppModalHeaderComponent,
    AppModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SessionService,
        // UrlService,
        RouteGuard,
        LayoutStoreService,
      ],
    };
  }
}
