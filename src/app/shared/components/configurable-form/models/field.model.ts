import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.model';

export interface Field {
  config: FieldConfig;
  formGroup: FormGroup;
  clicked?: EventEmitter<any>;
  changed?: EventEmitter<any>;
}
