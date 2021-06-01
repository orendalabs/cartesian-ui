import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormHelper } from '@app/shared/helpers';
import { FieldConfig } from '../models/field-config.model';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements OnInit, AfterViewChecked {
  @Input() config: FieldConfig;
  @Input() formGroup: FormGroup;
  @Output() changed?: EventEmitter<Event> = new EventEmitter();
  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  validators: ValidatorFn[];

  constructor() {}

  ngOnInit(): void {
    this.validators = this.config.validators;
  }

  ngAfterViewChecked(): void {
    if (this.validators !== this.config.validators) {
      this.validators = this.config.validators;
      const ctrl = this.formGroup.controls[this.config.name];
      ctrl.setValidators(this.validators);
      ctrl.updateValueAndValidity();
    }
  }

  getFormClasses(): string {
    const control = this.formGroup.controls[this.config.name];
    return FormHelper.getFormClasses(control);
  }
}
