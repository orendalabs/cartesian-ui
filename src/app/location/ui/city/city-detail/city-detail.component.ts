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
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import { SearchCountryForm, SearchStateForm } from '@app/location/models/form';
import { CityUpdateForm } from '@app/location/models/form/update-city.model';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain';
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
  selector: 'city-detail',
  templateUrl: './city-detail.component.html',
})
export class CityDetailComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('detailCard') detailCard: ElementRef;
  @ViewChild('formCard') formCard: ElementRef;

  config: FieldConfig[];

  subscriptions: Array<Subscription> = [];

  city: City;
  loaded: boolean;
  loading: boolean;
  failed: boolean;
  deleting = false;

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

  constructor(
    injector: Injector,
    private _sandbox: LocationSandbox,
    private route: ActivatedRoute,
    private router: Router
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
        label: 'Save',
        name: 'submit',
        type: 'button',
        classes: 'btn btn-primary pull-right',
      },
    ];
  }

  save(group): void {
    if (this.loading) {
      this.notify.warn('Please wait for previous request', 'Warning!');
      return;
    }
    if (group.valid) {
      const noState = this.config[nameIndexMap.stateId].hidden;
      const form = new CityUpdateForm({
        id: this.city.id,
        countryId: group.controls.countryId.value,
        stateId: noState ? '' : group.controls.stateId.value,
        name: group.controls.name.value,
        latitude: group.controls.latitude.value,
        longitude: group.controls.longitude.value,
      });
      this._sandbox.updateCity(form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
    }
  }

  delete(): void {
    this.message.confirm(
      `Are you sure you want to delete city ${this.city.name}?`,
      'Delete City',
      (result) => {
        if (result) {
          this.notify.info('Deleting city');
          this.deleting = true;
          this._sandbox.deleteCity(this.city.id);
        }
      }
    );
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = params.id;
        this._sandbox.fetchCity(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.cityLoading$.subscribe((loading: boolean) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.cityLoaded$.subscribe((loaded: boolean) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.success('City deleted', 'Success!');
            this.router.navigate(['locations', 'cities']);
          }
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.cityFailed$.subscribe((failed: boolean) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.success('Could not delete city', 'Error!');
            this.deleting = false;
          }
        }
        this.failed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.city$.subscribe((city: City) => (this.city = city))
    );
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
