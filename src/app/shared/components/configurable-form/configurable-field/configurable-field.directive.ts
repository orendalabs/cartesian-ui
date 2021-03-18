import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  Output,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from '../form-button/form-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';

import { Field } from '../models/field.model';
import { FieldConfig } from '../models/field-config.model';

const components: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
};

@Directive({
  selector: '[configurableField]',
})
export class ConfigurableFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: FieldConfig;
  @Input() formGroup: FormGroup;
  @Output() changed?: EventEmitter<Event> = new EventEmitter();
  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.formGroup = this.formGroup;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.formGroup = this.formGroup;
    if (this.config.onChange) {
      this.component.instance.changed.subscribe((event) =>
        this.config.onChange(event)
      );
    }
    if (this.config.onClick) {
      this.component.instance.clicked.subscribe((event) =>
        this.config.onClick(event)
      );
    }
  }
}
