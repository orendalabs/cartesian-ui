import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppConstants, HttpServiceModule, AxisHttpInterceptor } from '@cartesian-ui/ng-axis';
import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { AppInitializer } from '../app-initializer';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';

// Store
import { reducer as settingReducer }  from '@app/setting';

// Third Party
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import * as _ from 'lodash';

import { StoreModule }         from '@ngrx/store';
import { EffectsModule }       from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function getCurrentLanguage(): string {
  if (axis.localization.currentLanguage.name) {
    return axis.localization.currentLanguage.name;
  }

  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'en';
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
    ServiceProxyModule,
    RootRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    HttpServiceModule.forRoot(),

    StoreModule.forRoot({ setting: settingReducer }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot()
  ],
  declarations: [RootComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
    { provide: API_BASE_URL, useFactory: () => AppConstants.remoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true,
    },
    {provide: LOCALE_ID, useFactory: getCurrentLanguage },
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
