import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { CountryCreateForm } from '@app/location/models/form';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { FormHelper } from '@app/shared/helpers';

@Component({
  selector: 'country-create',
  templateUrl: './country-create.component.html',
})
export class CountryCreateComponent extends BaseComponent implements OnInit {
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      placeholder: 'Enter name',
    },
    {
      type: 'input',
      label: 'Native',
      name: 'native',
      validation: [Validators.required],
      placeholder: 'Enter native',
    },
    {
      type: 'input',
      label: 'Alpha 2',
      name: 'alpha2',
      validation: [Validators.required, Validators.pattern('[A-Z]{2}')],
      placeholder: 'Enter Alpha 2',
    },
    {
      type: 'input',
      label: 'Alpha 3',
      name: 'alpha3',
      validation: [Validators.required, Validators.pattern('[A-Z]{3}')],
      placeholder: 'Enter Alpha 3',
    },
    {
      type: 'input',
      label: 'ISD',
      name: 'isd',
      validation: [Validators.required],
      placeholder: 'Enter ISD',
    },
    {
      type: 'input',
      label: 'Capital',
      name: 'capital',
      validation: [Validators.required],
      placeholder: 'Enter capital',
    },
    {
      type: 'input',
      label: 'Currency',
      name: 'currency',
      validation: [Validators.required],
      placeholder: 'Enter currency',
    },
    {
      type: 'input',
      label: 'Continent',
      name: 'continent',
      validation: [Validators.required],
      placeholder: 'Enter continent',
    },
    {
      type: 'input',
      label: 'Subcontinent',
      name: 'subcontinent',
      validation: [Validators.required],
      placeholder: 'Enter subcontinent',
    },
    {
      type: 'input',
      label: 'Emoji',
      name: 'emoji',
      validation: [Validators.required],
      placeholder: 'Enter emoji',
    },
    {
      type: 'input',
      label: 'Emoji Unicode',
      name: 'emojiUnicode',
      validation: [Validators.required, FormHelper.unicodeValidator()],
      placeholder: 'Enter emoji unicode',
    },
    {
      label: 'Create',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];
  constructor(
    private injector: Injector,
    private _sandbox: LocationSandbox) {
      super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  create(group): void {
    if (this.config[11].disabled) {
      this.notify.warn('Please wait for the previous request', 'Warning!');
    }
    if (group.valid) {
      const form = new CountryCreateForm({
        name: group.controls.name.value,
        native: group.controls.native.value,
        alpha2: group.controls.alpha2.value,
        alpha3: group.controls.alpha3.value,
        isd: group.controls.isd.value,
        capital: group.controls.capital.value,
        currency: group.controls.currency.value,
        continent: group.controls.continent.value,
        subcontinent: group.controls.subcontinent.value,
        emoji: group.controls.emoji.value,
        emojiUnicode: group.controls.emojiUnicode.value,
      });
      this._sandbox.createCountry(form);
    } else {
      this.notify.warn('Invalid data', 'Warning!');
    }
  }

  registerEvents() {
    this._sandbox.countryLoading$.subscribe((loading) => {
      if (loading) {
        this.notify.info('Creating country');
      }
      this.config[11].disabled = true;
    });
    this._sandbox.countryLoaded$.subscribe((loaded) => {
      if (loaded) {
        this.notify.success('Country created', 'Success!');
      }
      this.config[11].disabled = false;
    });
    this._sandbox.countryFailed$.subscribe((failed) => {
      if (failed) {
        this.notify.error('Could not create country', 'Error!');
      }
      this.config[11].disabled = false;
    });
  }
}
