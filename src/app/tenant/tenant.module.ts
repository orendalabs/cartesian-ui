import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { tenantFeatureKey } from './store/tenant.reducer';
import { tenantReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { TenantEffects } from './store/tenant.effect';
import { TenantSandbox } from './tenant.sandbox';
import { TenantListComponent } from './ui/tenant-list/tenant-list.component';
import { TenantHttpService } from './shared';
import { TenantCreateComponent } from './ui/tenant-create/tenant-create.component';
import { TenantUpdateComponent } from './ui/tenant-update/tenant-update.component';
import { ConfigurableFormModule } from '@app/shared/components/configurable-form/configurable-form.module';

@NgModule({
  declarations: [TenantComponent, TenantListComponent, TenantCreateComponent, TenantUpdateComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ConfigurableFormModule,
    StoreModule.forFeature(tenantFeatureKey, tenantReducers),
    EffectsModule.forFeature([TenantEffects]),
  ],
  providers: [
    TenantSandbox,
    TenantHttpService
  ]
})
export class TenantModule { }
