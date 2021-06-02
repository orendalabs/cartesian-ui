import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField } from './form-field.model';

export interface IConfigurableField {
  config: IFormField;
  formGroup: FormGroup;
  clicked?: EventEmitter<any>;
  changed?: EventEmitter<any>;
}
