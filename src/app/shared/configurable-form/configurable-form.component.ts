import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormField } from './models/form-field.model';

@Component({
  selector: 'configurable-form',
  templateUrl: './configurable-form.component.html',
})
export class ConfigurableFormComponent implements OnInit {
  @Input() config: IFormField[] = [];
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.createGroup();
  }

  createGroup(): FormGroup {
    const group = this.fb.group({});
    this.config.forEach((config) =>
      group.addControl(config.name, this.fb.control('', config.validators))
    );
    return group;
  }
}
