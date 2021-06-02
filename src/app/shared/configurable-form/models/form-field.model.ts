import { ValidatorFn } from '@angular/forms';
import { IFormFieldSelectOptions } from './form-field-select.model';

export interface IFormField {
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
  options?: IFormFieldSelectOptions[];

  /** Placeholder for the control */
  placeholder?: string;

  /** Type of the control e.g input, select, button */
  type: string;

  /** Array of validator functions */
  validators?: ValidatorFn[];

  /** The value of the control */
  value?: any;

  /** Style classes for the control */
  classes?: string;

  /** Message to show if data invalid */
  invalidMessage?: string;

  /** Names of the classes to use as prepend icon. Example `fa fa-user` */
  prependIcon?: string;

  /** Names of the classes to use as append icon. Example `fa fa-user` */
  appendIcon?: string;

  /** Method called on click event. Takes an event parameter */
  onClick?: (event) => void;

  /** Method called on change event. Takes an event parameter */
  onChange?: (event) => void;
}
