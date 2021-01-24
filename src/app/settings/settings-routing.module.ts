import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { SettingsAddComponent } from './ui/settings-create/settings-create.component';
import { SettingsListComponent } from './ui/settings-list/settings-list.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: "Settings"
    },
    children: [
      {
        path: 'create',
        component: SettingsAddComponent,
        data: {
          title: "Create Setting",
        }
      },
      {
        path: '',
        component: SettingsListComponent,
        data: {
          title: "Settings List"
        }
      }
    ]
  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class SettingsRoutingModule { }
