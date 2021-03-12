import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
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
export class CountryCreateComponent extends BaseComponent implements OnInit, OnDestroy {
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      placeholder: 'Enter name',
      invalidMessage: 'Please enter a name'
    },
    {
      type: 'input',
      label: 'Native',
      name: 'native',
      validation: [Validators.required],
      placeholder: 'Enter native',
      invalidMessage: 'Please enter a native'
    },
    {
      type: 'input',
      label: 'Alpha 2',
      name: 'alpha2',
      validation: [Validators.required, Validators.pattern('[A-Z]{2}')],
      placeholder: 'Enter Alpha 2',
      invalidMessage: 'Please enter a valid code (Two capital letters)'
    },
    {
      type: 'input',
      label: 'Alpha 3',
      name: 'alpha3',
      validation: [Validators.required, Validators.pattern('[A-Z]{3}')],
      placeholder: 'Enter Alpha 3',
      invalidMessage: 'Please enter a valid code (Three capital letters)'
    },
    {
      type: 'input',
      label: 'ISD',
      name: 'isd',
      validation: [Validators.required],
      placeholder: 'Enter ISD',
      invalidMessage: 'Please enter an ISD'
    },
    {
      type: 'input',
      label: 'Capital',
      name: 'capital',
      validation: [Validators.required],
      placeholder: 'Enter capital',
      invalidMessage: 'Please enter a Capital '
    },
    {
      type: 'input',
      label: 'Currency',
      name: 'currency',
      validation: [Validators.required],
      placeholder: 'Enter currency',
      invalidMessage: 'Please enter a currency'
    },
    {
      type: 'input',
      label: 'Continent',
      name: 'continent',
      validation: [Validators.required],
      placeholder: 'Enter continent',
      invalidMessage: 'Please enter a continent'
    },
    {
      type: 'input',
      label: 'Subcontinent',
      name: 'subcontinent',
      validation: [Validators.required],
      placeholder: 'Enter subcontinent',
      invalidMessage: 'Please enter a subcontinent'
    },
    {
      type: 'input',
      label: 'Emoji',
      name: 'emoji',
      validation: [Validators.required],
      placeholder: 'Enter emoji',
      invalidMessage: 'Please enter an emoji'
    },
    {
      type: 'input',
      label: 'Emoji Unicode',
      name: 'emojiUnicode',
      validation: [Validators.required, FormHelper.unicodeValidator()],
      placeholder: 'Enter emoji unicode',
      invalidMessage: 'Please enter a valid unicode'
    },
    {
      label: 'Create',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(
    private injector: Injector,
    private _sandbox: LocationSandbox) {
      super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.unregisterEvents();
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
    this.subscriptions.push(
      this._sandbox.countryLoading$.subscribe((loading) => {
        if (loading && this.loading != undefined) {
          this.notify.info('Creating country');
        }
        this.config[11].disabled = true;
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.countryLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded != undefined) {
          this.notify.success('Country created', 'Success!');
        }
        this.config[11].disabled = false;
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.countryFailed$.subscribe((failed) => {
        if (failed && this.failed != undefined) {
          this.notify.error('Could not create country', 'Error!');
        }
        this.config[11].disabled = false;
        this.failed = failed;
      })
    );
  }
}
