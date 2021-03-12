import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain';
import { Subscription } from 'rxjs';
import {
  LocationCreateForm,
  SearchCityForm,
  SearchCountryForm,
  SearchStateForm,
} from '../../../models/form/';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { ISelectFieldOption } from '@app/shared/components/configurable-form/models/select-field.model';
import { BaseComponent } from '@app/core/ui';

enum nameIndexMap {
  'locatableType' = 0,
  'locatableId' = 1,
  'addressLine1' = 2,
  'addressLine2' = 3,
  'countryId' = 4,
  'stateId' = 5,
  'cityId' = 6,
  'postCode' = 7,
  'latitude' = 8,
  'longitude' = 9,
  'submit' = 10,
}

@Component({
  selector: 'location-create',
  templateUrl: './location-create.component.html',
})
export class LocationCreateComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formCard') formCard: ElementRef;
  subscriptions: Subscription[] = [];

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  countriesLoading: boolean;
  countriesLoaded: boolean;
  countriesFailed: boolean;
  countriesCriteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(100000);

  statesLoading: boolean;
  statesLoaded: boolean;
  statesFailed: boolean;
  statesCriteria = new RequestCriteria<SearchStateForm>(
    new SearchStateForm()
  ).limit(100000);

  citiesLoading: boolean;
  citiesLoaded: boolean;
  citiesFailed: boolean;
  citiesCriteria = new RequestCriteria<SearchCityForm>(
    new SearchCityForm()
  ).limit(100000);

  config: FieldConfig[];

  constructor(protected injector: Injector,
     protected _sandbox: LocationSandbox) {
      super(injector);
  }

  ngOnInit(): void {
    this.initConfig();
  }

  ngAfterViewInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  initConfig() {
    this.config = [
      {
        type: 'input',
        label: 'Locatable Type',
        name: 'locatableType',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'Locatable ID',
        name: 'locatableId',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'Address Line 1',
        name: 'addressLine1',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'Address Line 2',
        name: 'addressLine2',
        validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'Country',
        name: 'countryId',
        options: [],
        change: (event) => {
          const id = event.target.value;

          const stateControl = this.config[nameIndexMap.stateId];
          stateControl.options = [];
          stateControl.hidden = true;
          stateControl.value = '';

          const cityControl = this.config[nameIndexMap.cityId];
          cityControl.options = [];
          cityControl.hidden = true;
          cityControl.value = '';
          this.setCityValidators();

          this.config[nameIndexMap.submit].disabled = true;

          this.statesCriteria.where('country_id', '=', id);
          this._sandbox.fetchStates(this.statesCriteria);
        },
        placeholder: 'Select Country...',
        validation: [Validators.required],
      },
      {
        type: 'select',
        label: 'State',
        name: 'stateId',
        options: [],
        change: (event) => {
          const id = event.target.value;
          const cityControl = this.config[nameIndexMap.cityId];
          cityControl.options = [];
          cityControl.hidden = true;
          cityControl.value = '';

          this.config[nameIndexMap.submit].disabled = true;

          this.citiesCriteria.where('state_id', '=', id);
          this._sandbox.fetchCities(this.citiesCriteria);
        },
        hidden: true,
        placeholder: 'Select State...',
      },
      {
        type: 'select',
        label: 'City',
        name: 'cityId',
        options: [],
        hidden: true,
        placeholder: 'Select City...',
      },
      {
        type: 'input',
        label: 'Post Code',
        name: 'postCode',
        validation: [Validators.required],
      },
      {
        type: 'input',
        label: 'Latitude',
        name: 'latitude',
        validation: [
          Validators.required,
          FormHelper.isFloatValidator(),
          Validators.min(-90),
          Validators.max(90),
        ],
      },
      {
        type: 'input',
        label: 'Longitude',
        name: 'longitude',
        validation: [
          Validators.required,
          FormHelper.isFloatValidator(),
          Validators.min(-180),
          Validators.max(180),
        ],
      },
      {
        label: 'Create',
        name: 'submit',
        type: 'button',
        classes: 'btn btn-primary pull-right',
      },
    ];
  }

  create(group): void {
    if (group.valid) {
      const noState = this.config[nameIndexMap.stateId].hidden;
      const noCity = this.config[nameIndexMap.cityId].hidden;
      const form = new LocationCreateForm({
        locatableType: group.controls['locatableType'].value,
        locatableId: group.controls['locatableId'].value,
        addressLine1: group.controls['addressLine1'].value,
        addressLine2: group.controls['addressLine2'].value,
        countryId: group.controls['countryId'].value,
        stateId: noState ? '' : group.controls['stateId'].value,
        cityId: noCity ? '' : group.controls['cityId'].value,
        postCode: group.controls['postCode'].value,
        latitude: group.controls['latitude'].value,
        longitude: group.controls['longitude'].value,
      });
      this._sandbox.createLocation(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((c: Country[]) => {
        if (c) {
          this.config[nameIndexMap.countryId].options = Object.values(c).map(
            (v): ISelectFieldOption => {
              return {
                name: v.name,
                value: v.id,
              };
            }
          );
          this.setCountryValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.formCard.nativeElement);
        }
        this.countriesLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.countriesLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.countriesFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.statesData$.subscribe((s: State[]) => {
        if (s) {
          const values = Object.values(s);
          this.config[nameIndexMap.stateId].hidden = values.length === 0;
          this.config[nameIndexMap.stateId].options = values.map(
            (v): ISelectFieldOption => {
              return {
                name: v.name,
                value: v.id,
              };
            }
          );
          this.config[nameIndexMap.submit].disabled = false;
          this.setStateValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.statesLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.formCard.nativeElement);
        }
        this.statesLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.statesLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.statesLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.statesFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.statesFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesData$.subscribe((c: City[]) => {
        if (c) {
          const values = Object.values(c);
          this.config[nameIndexMap.cityId].hidden = values.length === 0;
          this.config[nameIndexMap.cityId].options = values.map(
            (v): ISelectFieldOption => {
              return {
                name: v.name,
                value: v.id,
              };
            }
          );
          this.config[nameIndexMap.submit].disabled = false;
          this.setCityValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.formCard.nativeElement);
        }
        this.citiesLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.citiesLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.citiesFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.locationLoading$.subscribe((loading) => {
        if (loading && this.loading != undefined) {
          this.notify.info('Creating location');
          this.config[nameIndexMap.submit].disabled = true;
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.locationLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded != undefined) {
          this.notify.success('Location created', 'Success!');
          this.config[nameIndexMap.submit].disabled = false;
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.locationFailed$.subscribe((failed) => {
        if (failed && this.failed != undefined) {
          this.notify.error('Could not create location', 'Error!');
          this.config[nameIndexMap.submit].disabled = false;
        }
        this.failed = failed;
      })
    );
  }

  setCountryValidators(): void {
    const control = this.config[nameIndexMap.countryId];
    const countryIds = control.options.map((c) => c.value.toString());
    control.validation = [FormHelper.inValidator(countryIds)];
  }

  setStateValidators(): void {
    const control = this.config[nameIndexMap.stateId];
    if (control.options.length === 0) {
      control.validation = [];
    } else {
      const stateIds = control.options.map((s) => s.value.toString());
      control.validation = [FormHelper.inValidator(stateIds)];
    }
  }

  setCityValidators(): void {
    const control = this.config[nameIndexMap.cityId];
    if (control.options.length === 0) {
      control.validation = [];
    } else {
      const cityIds = control.options.map((c) => c.value.toString());
      control.validation = [FormHelper.inValidator(cityIds)];
    }
  }
}
