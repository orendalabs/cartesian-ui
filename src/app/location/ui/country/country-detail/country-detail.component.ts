import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country } from '@app/location/models/domain';
import { CountryUpdateForm } from '@app/location/models/form';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { FormHelper } from '@app/shared/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'country-detail',
  templateUrl: './country-detail.component.html',
})
export class CountryDetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('detailCard') detailCard: ElementRef;
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
      label: 'Save',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  subscriptions: Array<Subscription> = [];
  country: Country;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  constructor(
    protected injector: Injector,
    protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.registerEvents();
  }

  delete(): void {
    if (
      confirm(
        'Are you sure you want to delete country ' + this.country.name + '?'
      )
    ) {
      this._sandbox.deleteCountry(this.country.id);
    }
  }

  save(group): void {
    if (group.valid) {
      const form = new CountryUpdateForm({
        id: this.country.id,
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
      this._sandbox.updateCountry(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = params.id;
        this._sandbox.fetchCountry(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.countryLoading$.subscribe(
        (loading: boolean) => {
          if (loading) {
            this.ui.setBusy(this.detailCard.nativeElement);
          }
          this.loading = loading;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.countryLoaded$.subscribe(
        (loaded: boolean) => {
          if (loaded) {
            this.ui.clearBusy(this.detailCard.nativeElement);
          }
          this.loaded = loaded;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.countryFailed$.subscribe(
        (failed: boolean) => {
          if (failed) {
            this.ui.clearBusy(this.detailCard.nativeElement);
          }
          this.failed = failed;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.country$.subscribe(
        (country: Country) => (this.country = country)
      )
    );
  }
}
