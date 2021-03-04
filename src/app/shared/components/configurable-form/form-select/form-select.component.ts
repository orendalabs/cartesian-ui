import { AfterViewChecked, Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormHelper } from '@app/shared/helpers';
import { FieldConfig } from '../models/field-config.model';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent implements OnInit, AfterViewChecked {
  oldValidation;
  config: FieldConfig;
  formGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.oldValidation = this.config.validation;
  }

  ngAfterViewChecked(): void {
    if (this.oldValidation != this.config.validation) {
      this.oldValidation = this.config.validation;
      const ctrl = this.formGroup.controls[this.config.name];
      ctrl.setValidators(this.config.validation);
      ctrl.updateValueAndValidity();
    }
  }

  getFormClasses(): string {
    const control = this.formGroup.controls[this.config.name];
    return FormHelper.getFormClasses(control);
  }
  
}
