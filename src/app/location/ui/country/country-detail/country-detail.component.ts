import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CountryDetailComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('detailCard') detailCard: ElementRef;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      placeholder: 'Enter name',
      invalidMessage: 'Please enter a name',
    },
    {
      type: 'input',
      label: 'Native',
      name: 'native',
      validation: [Validators.required],
      placeholder: 'Enter native',
      invalidMessage: 'Please enter a native',
    },
    {
      type: 'input',
      label: 'Alpha 2',
      name: 'alpha2',
      validation: [Validators.required, Validators.pattern('[A-Z]{2}')],
      placeholder: 'Enter Alpha 2',
      invalidMessage: 'Please enter a valid code (Two capital letters)',
    },
    {
      type: 'input',
      label: 'Alpha 3',
      name: 'alpha3',
      validation: [Validators.required, Validators.pattern('[A-Z]{3}')],
      placeholder: 'Enter Alpha 3',
      invalidMessage: 'Please enter a valid code (Three capital letters)',
    },
    {
      type: 'input',
      label: 'ISD',
      name: 'isd',
      validation: [Validators.required],
      placeholder: 'Enter ISD',
      invalidMessage: 'Please enter an ISD',
    },
    {
      type: 'input',
      label: 'Capital',
      name: 'capital',
      validation: [Validators.required],
      placeholder: 'Enter capital',
      invalidMessage: 'Please enter a Capital ',
    },
    {
      type: 'input',
      label: 'Currency',
      name: 'currency',
      validation: [Validators.required],
      placeholder: 'Enter currency',
      invalidMessage: 'Please enter a currency',
    },
    {
      type: 'input',
      label: 'Continent',
      name: 'continent',
      validation: [Validators.required],
      placeholder: 'Enter continent',
      invalidMessage: 'Please enter a continent',
    },
    {
      type: 'input',
      label: 'Subcontinent',
      name: 'subcontinent',
      validation: [Validators.required],
      placeholder: 'Enter subcontinent',
      invalidMessage: 'Please enter a subcontinent',
    },
    {
      type: 'input',
      label: 'Emoji',
      name: 'emoji',
      validation: [Validators.required],
      placeholder: 'Enter emoji',
      invalidMessage: 'Please enter an emoji',
    },
    {
      type: 'input',
      label: 'Emoji Unicode',
      name: 'emojiUnicode',
      validation: [Validators.required, FormHelper.unicodeValidator()],
      placeholder: 'Enter emoji unicode',
      invalidMessage: 'Please enter a valid unicode',
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
  deleting = false;

  constructor(
    injector: Injector,
    private _sandbox: LocationSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  delete(): void {
    this.message.confirm(
      `Are you sure you want to delete country ${this.country.name}?`,
      'Delete Country',
      (result) => {
        if (result) {
          this.notify.info('Deleting country');
          this.deleting = true;
          this._sandbox.deleteCountry(this.country.id);
        }
      }
    );
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
      this._sandbox.countryLoading$.subscribe((loading: boolean) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.countryLoaded$.subscribe((loaded: boolean) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.success('Country deleted', 'Success!');
            this.router.navigate(['locations', 'countries']);
          }
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.countryFailed$.subscribe((failed: boolean) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.success('Could not delete country', 'Error!');
          }
        }
        this.failed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.country$.subscribe(
        (country: Country) => (this.country = country)
      )
    );
  }
}
