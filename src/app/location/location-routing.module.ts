import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { CityListComponent } from './ui/city/city-list/city-list.component';


const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    data: {},
    children: [
      {
        path: '',
        component: CityListComponent,
        pathMatch: 'full',
        data: {
          title: 'Cities',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
