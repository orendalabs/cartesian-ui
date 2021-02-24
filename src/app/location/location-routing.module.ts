import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { CityCreateComponent } from './ui/city/city-create/city-create.component';
import { CityListComponent } from './ui/city/city-list/city-list.component';
import { CountryCreateComponent } from './ui/country/country-create/country-create.component';
import { CountryListComponent } from './ui/country/country-list/country-list.component';
import { LocationCreateComponent } from './ui/location/location-create/location-create.component';
import { LocationListComponent } from './ui/location/location-list/location-list.component';
import { StateCreateComponent } from './ui/state/state-create/state-create.component';
import { StateListComponent } from './ui/state/state-list/state-list.component';


const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    data: {},
    children: [
      {
        path: 'list',
        component: LocationListComponent,
        pathMatch: 'full',
        data: {
          title: 'Locations',
        },
      },
      {
        path: 'create',
        component: LocationCreateComponent,
        pathMatch: 'full',
        data: {
          title: 'Create Location',
        },
      },
      {
        path: 'cities',
        data: {
          title: 'Cities',
        },
        children: [
          {
            path: '',
            component: CityListComponent,
            data: { title: 'Cities' },
          },
          {
            path: 'create',
            component: CityCreateComponent,
            data: { title: 'Create City' },
          },
        ]
      },
      {
        path: 'countries',
        data: {
          title: 'Countries',
        },
        children: [
          {
            path: '',
            component: CountryListComponent,
            data: { title: 'Countries' },
          },
          {
            path: 'create',
            component: CountryCreateComponent,
            data: { title: 'Create Country' },
          },
        ]
      },
      {
        path: 'states',
        data: {
          title: 'States',
        },
        children: [
          {
            path: '',
            component: StateListComponent,
            data: { title: 'States' },
          },
          {
            path: 'create',
            component: StateCreateComponent,
            data: { title: 'Create State' },
          },
        ]
      },
      {
        path: '',
        redirectTo: 'list'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
