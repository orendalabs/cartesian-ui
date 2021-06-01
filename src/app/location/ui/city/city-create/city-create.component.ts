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
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country } from '@app/location/models/domain';
import {
  CityCreateForm,
  SearchCountryForm,
  SearchStateForm,
} from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain/state.model';
import { Subscription } from 'rxjs';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { BaseComponent } from '@app/core/ui';

enum nameIndexMap {
  countryId = 0,
  stateId = 1,
  name = 2,
  latitude = 3,
  longitude = 4,
  submit = 5,
}

@Component({
  selector: 'city-create',
  templateUrl: './city-create.component.html',
})
export class CityCreateComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formCard') formCard: ElementRef;
  config: FieldConfig[];

  subscriptions: Subscription[] = [];

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

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(
    protected injector: Injector,
    protected _sandbox: LocationSandbox
  ) {
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

  initConfig(): void {
    this.config = [
      {
        type: 'select',
        label: 'Country',
        name: 'countryId',
        options: [],
        onChange: (event) => {
          const id = event.target.value;

          const stateControl = this.config[nameIndexMap.stateId];
          stateControl.options = null;
          stateControl.value = '';
          stateControl.hidden = true;
          stateControl.validators = [];

          this.config[nameIndexMap.submit].disabled = true;

          this.statesCriteria.where('country_id', '=', id);
          this._sandbox.fetchStates(this.statesCriteria);
        },
        validators: [Validators.required],
        placeholder: 'Select Country',
        invalidMessage: 'Please select a valid country',
      },
      {
        type: 'select',
        label: 'State',
        name: 'stateId',
        options: [],
        hidden: true,
        validators: [Validators.required],
        placeholder: 'Select State',
        invalidMessage: 'Please select a valid state',
      },
      {
        type: 'input',
        label: 'Name',
        name: 'name',
        validators: [Validators.required],
        placeholder: 'Enter Name',
        invalidMessage: 'Please enter a name',
      },
      {
        type: 'input',
        label: 'Latitude',
        name: 'latitude',
        validators: [
          Validators.required,
          FormHelper.isFloatValidator(),
          Validators.min(-90),
          Validators.max(90),
        ],
        invalidMessage: 'Please enter a valid latitude (-90.0 to 90.0)',
      },
      {
        type: 'input',
        label: 'Longitude',
        name: 'longitude',
        validators: [
          Validators.required,
          FormHelper.isFloatValidator(),
          Validators.min(-180),
          Validators.max(180),
        ],
        invalidMessage: 'Please enter a valid latitude (-180.0 to 180.0)',
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
      const form = new CityCreateForm({
        countryId: group.controls.countryId.value,
        stateId: noState ? '' : group.controls.stateId.value,
        name: group.controls.name.value,
        latitude: group.controls.latitude.value,
        longitude: group.controls.longitude.value,
      });
      this._sandbox.createCity(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((countries: Country[]) => {
        if (countries) {
          this.config[nameIndexMap.countryId].options = Object.values(
            countries
          ).map((country) => {
            return {
              name: country.name,
              value: country.id,
            };
          });
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
      this._sandbox.statesData$.subscribe((states: State[]) => {
        if (states) {
          const values = Object.values(states);
          this.config[nameIndexMap.stateId].hidden = values.length === 0;
          this.config[nameIndexMap.stateId].options = values.map((state) => {
            return {
              name: state.name,
              value: state.id,
            };
          });
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
      this._sandbox.cityLoading$.subscribe((loading) => {
        if (loading && this.loading !== undefined) {
          this.notify.info('Creating city');
          this.config[5].disabled = true;
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.cityLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded !== undefined) {
          this.notify.success('City created', 'Success!');
        }
        this.config[5].disabled = false;
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.cityFailed$.subscribe((failed) => {
        if (failed && this.failed !== undefined) {
          this.notify.error('Could not create city', 'Error!');
        }
        this.config[5].disabled = false;
        this.failed = failed;
      })
    );
  }

  setCountryValidators(): void {
    const control = this.config[nameIndexMap.countryId];
    const countryIds = control.options.map((c) => c.value.toString());
    control.validators = [
      Validators.required,
      FormHelper.inValidator(countryIds),
    ];
  }

  setStateValidators(): void {
    const control = this.config[nameIndexMap.stateId];
    if (control.options.length === 0) {
      control.validators = [];
    } else {
      const stateIds = control.options.map((s) => s.value.toString());
      control.validators = [
        Validators.required,
        FormHelper.inValidator(stateIds),
      ];
    }
  }
}
