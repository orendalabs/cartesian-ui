import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsListComponent } from './ui/settings-list/settings-list.component';
import { SettingsAddComponent } from './ui/settings-create/settings-create.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsSandbox } from './settings.sandbox';
import { SettingEffects } from './store/setting.effect';
import { StoreModule } from '@ngrx/store';
import { settingFeatureKey, settingReducers } from './store/setting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingHttpService } from './shared/setting-http.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [SettingsListComponent, SettingsAddComponent, SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgxDatatableModule,
    StoreModule.forFeature(settingFeatureKey, settingReducers),
    EffectsModule.forFeature([SettingEffects])
  ],
  providers: [
    SettingsSandbox,
    SettingHttpService
  ]
})
export class SettingsModule { }
