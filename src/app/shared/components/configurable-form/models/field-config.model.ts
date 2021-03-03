import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  inputType?: string,
  options?: any[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any,
  classes?: string,
  click?: any
}