import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurableFormComponent } from './configurable-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './elements/button/button.component';
import { InputComponent } from './elements/input/input.component';
import { SelectComponent } from './elements/select/select.component';
import { ConfigurableField } from './directives/configurable-field.directive';



@NgModule({
  declarations: [
    ConfigurableFormComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    ConfigurableField
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ConfigurableFormComponent
  ]
})
export class ConfigurableFormModule { }
