import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurableFormComponent } from './configurable-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { ConfigurableFieldDirective } from './configurable-field/configurable-field.directive';



@NgModule({
  declarations: [ConfigurableFormComponent, FormInputComponent, FormButtonComponent, FormSelectComponent, ConfigurableFieldDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ConfigurableFormComponent
  ]
})
export class ConfigurableFormModule { }
