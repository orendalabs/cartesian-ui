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
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LocationComponent, CityListComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    StoreModule.forFeature(locationFeatureKey, locationReducers),
    EffectsModule.forFeature([LocationEffects]),
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    LocationHttpService,
    LocationSandbox,
  ]
})
export class LocationModule { }
