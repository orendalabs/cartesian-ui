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

import { ButtonComponent } from '../elements/button/button.component';
import { InputComponent } from '../elements/input/input.component';
import { SelectComponent } from '../elements/select/select.component';

import { IConfigurableField } from '../models/configurable-field.model';
import { IFormField } from '../models/form-field.model';

const components: { [type: string]: Type<IConfigurableField> } = {
  button: ButtonComponent,
  input: InputComponent,
  select: SelectComponent,
};

@Directive({
  selector: '[configurableField]',
})
export class ConfigurableField implements IConfigurableField, OnChanges, OnInit {
  @Input() config: IFormField;
  @Input() formGroup: FormGroup;
  @Output() changed?: EventEmitter<Event> = new EventEmitter();
  @Output() clicked?: EventEmitter<Event> = new EventEmitter();

  component: ComponentRef<IConfigurableField>;

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
    const component = this.resolver.resolveComponentFactory<IConfigurableField>(
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
