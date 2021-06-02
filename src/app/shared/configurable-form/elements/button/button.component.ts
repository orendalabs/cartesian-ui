import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField } from '../../models/form-field.model';

@Component({
  selector: 'form-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  config: IFormField;
  formGroup: FormGroup;

  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
