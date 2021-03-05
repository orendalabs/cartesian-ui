import { ValidatorFn } from '@angular/forms';
import { ISelectField } from './select-field.model';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  inputType?: string;
  hidden?: boolean;
  options?: ISelectField[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  classes?: string;
  click?: (event) => void;
  change?: (event) => void;
}
