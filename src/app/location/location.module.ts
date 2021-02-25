import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { CityListComponent } from './ui/city/city-list/city-list.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationSandbox } from './location.sandbox';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects, locationFeatureKey, locationReducers } from './store';
import { LocationHttpService } from './shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityCreateComponent } from './ui/city/city-create/city-create.component';
import { LocationListComponent } from './ui/location/location-list/location-list.component';
import { LocationCreateComponent } from './ui/location/location-create/location-create.component';
import { CountryListComponent } from './ui/country/country-list/country-list.component';
import { CountryCreateComponent } from './ui/country/country-create/country-create.component';
import { StateListComponent } from './ui/state/state-list/state-list.component';
import { StateCreateComponent } from './ui/state/state-create/state-create.component';
import { CityDetailComponent } from './ui/city/city-detail/city-detail.component';
import { CountryDetailComponent } from './ui/country/country-detail/country-detail.component';
import { LocationDetailComponent } from './ui/location/location-detail/location-detail.component';
import { StateDetailComponent } from './ui/state/state-detail/state-detail.component';



@NgModule({
  declarations: [LocationComponent, CityListComponent, CityCreateComponent, LocationListComponent, LocationCreateComponent, CountryListComponent, CountryCreateComponent, StateListComponent, StateCreateComponent, CityDetailComponent, CountryDetailComponent, LocationDetailComponent, StateDetailComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    StoreModule.forFeature(locationFeatureKey, locationReducers),
    EffectsModule.forFeature([LocationEffects]),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LocationHttpService,
    LocationSandbox,
  ]
})
export class LocationModule { }
