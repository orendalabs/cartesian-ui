import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models/field-config.model';

@Component({
  selector: 'form-button',
  templateUrl: './form-button.component.html',
})
export class FormButtonComponent implements OnInit {
  config: FieldConfig;
  formGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }
}
