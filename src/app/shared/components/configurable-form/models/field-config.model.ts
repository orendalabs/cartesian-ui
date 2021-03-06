import { ValidatorFn } from '@angular/forms';
import { ISelectFieldOption } from './select-field.model';

export interface FieldConfig {
  /** Handles disabled attribute of a control */
  disabled?: boolean;

  /** Label for the form control */
  label?: string;

  /** Name of the control. It is the property name for the FormGroup */
  name: string;

  /** Type of input as used in `<input/>` tag */
  inputType?: string;

  /** Handles if a control is visible */
  hidden?: boolean;

  /** Options for a select control */
  options?: ISelectField[];

  /** Placeholder for the control */
  placeholder?: string;

  /** Type of the control e.g input, select, button */
  type: string;

  /** Array of validator functions */
  validation?: ValidatorFn[];

  /** The value of the control */
  value?: any;

  /** Style classes for the control */
  classes?: string;

  /** Method called on click event. Takes an event parameter */
  click?: (event) => void;

  /** Method called on change event. Takes an event parameter */
  change?: (event) => void;
}
