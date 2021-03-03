import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.model';

export interface Field {
  config: FieldConfig;
  formGroup: FormGroup;
}