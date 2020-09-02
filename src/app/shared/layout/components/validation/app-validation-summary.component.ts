import {
  Component,
  Input,
  Injector,
  Renderer2,
  ElementRef,
  OnInit
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BaseComponent } from '@shared/layout';
import { AxisValidationError } from './app-validation.api';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './app-validation-summary.component.html'
})
export class AppValidationSummaryComponent extends BaseComponent implements OnInit {

  defaultValidationErrors: Partial<AxisValidationError>[] = [
    { name: 'required', localizationKey: 'ThisFieldIsRequired' },
    {
      name: 'minlength',
      localizationKey: 'PleaseEnterAtLeastNCharacter',
      propertyKey: 'requiredLength',
    },
    {
      name: 'maxlength',
      localizationKey: 'PleaseEnterNoMoreThanNCharacter',
      propertyKey: 'requiredLength',
    },
    {
      name: 'email',
      localizationKey: 'InvalidEmailAddress',
    },
    {
      name: 'pattern',
      localizationKey: 'InvalidPattern',
      propertyKey: 'requiredPattern',
    },
    {
      name: 'validateEqual',
      localizationKey: 'PairsDoNotMatch',
    },
  ];
  validationErrors = <AxisValidationError[]>this.defaultValidationErrors;

  @Input() control: AbstractControl;
  @Input() controlEl: ElementRef;

  constructor(injector: Injector, public _renderer: Renderer2) {
    super(injector);
  }

  @Input() set customValidationErrors(val: AxisValidationError[]) {
    if (val && val.length > 0) {
      const defaults = this.defaultValidationErrors.filter(
        (defaultValidationError) =>
          !val.find(
            (customValidationError) =>
              customValidationError.name === defaultValidationError.name
          )
      );
      this.validationErrors = <AxisValidationError[]>[...defaults, ...val];
    }
  }

  ngOnInit() {
    if (this.controlEl) {
      this.control.valueChanges.subscribe(() => {
        if (
          this.control.valid &&
          (this.control.dirty || this.control.touched)
        ) {
          this._renderer.removeClass(this.controlEl, 'is-invalid');
        }
      });
    }
  }

  getValidationErrorMessage(error: AxisValidationError): string {
    if (this.controlEl) {
      this._renderer.addClass(this.controlEl, 'is-invalid');
    }

    const propertyValue = this.control.errors[error.name][error.propertyKey];
    return !!propertyValue
      ? this.l(error.localizationKey, propertyValue)
      : this.l(error.localizationKey);
  }
}
