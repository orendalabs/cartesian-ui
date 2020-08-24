import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

import { AxisPaginationControlsComponent } from './components/pagination/axis-pagination-controls.component';
import { AxisValidationSummaryComponent } from './components/validation/axis-validation.summary.component';
import { AxisModalHeaderComponent } from './components/modal/axis-modal-header.component';
import { AxisModalFooterComponent } from './components/modal/axis-modal-footer.component';
import { LayoutStoreService } from './layout/layout-store.service';

import { BusyDirective } from './directives/busy.directive';
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule
    ],
    declarations: [
        AxisPaginationControlsComponent,
        AxisValidationSummaryComponent,
        AxisModalHeaderComponent,
        AxisModalFooterComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator
    ],
    exports: [
        AxisPaginationControlsComponent,
        AxisValidationSummaryComponent,
        AxisModalHeaderComponent,
        AxisModalFooterComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard,
                LayoutStoreService
            ]
        };
    }
}
