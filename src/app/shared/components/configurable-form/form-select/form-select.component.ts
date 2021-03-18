import {
  AfterViewChecked,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelper } from '@app/shared/helpers';
import { FieldConfig } from '../models/field-config.model';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent implements OnInit, AfterViewChecked {
  oldValidation;
  @Input() config: FieldConfig;
  @Input() formGroup: FormGroup;
  @Output() changed?: EventEmitter<Event> = new EventEmitter();
  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.oldValidation = this.config.validators;
  }

  ngAfterViewChecked(): void {
    if (this.oldValidation !== this.config.validators) {
      this.oldValidation = this.config.validators;
      const ctrl = this.formGroup.controls[this.config.name];
      ctrl.setValidators(this.config.validators);
      ctrl.updateValueAndValidity();
    }
  }

  getFormClasses(): string {
    const control = this.formGroup.controls[this.config.name];
    return FormHelper.getFormClasses(control);
  }
}
