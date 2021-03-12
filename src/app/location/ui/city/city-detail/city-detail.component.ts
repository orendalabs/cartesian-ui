import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
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
export class CityDetailComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('detailCard') detailCard: ElementRef;
  @ViewChild('formCard') formCard: ElementRef;

  config: FieldConfig[];

  subscriptions: Array<Subscription> = [];

  city: City;
  loaded: boolean;
  loading: boolean;
  failed: boolean;
  deleting: boolean = false;

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
    private injector: Injector,
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

  initConfig(): void {
    this.config = [
      {
        type: 'select',
        label: 'Country',
        name: 'countryId',
        options: [],
        change: (event) => {
          const id = event.target.value;

          const stateControl = this.config[nameIndexMap.stateId];
          stateControl.options = null;
          stateControl.value = '';
          stateControl.hidden = true;
          stateControl.validation = [];

          this.config[nameIndexMap.submit].disabled = true;

          this.statesCriteria.where("country_id", "=", id);
          this._sandbox.fetchStates(this.statesCriteria);
        },
        validation: [Validators.required],
        placeholder: 'Select Country',
      },
      {
        type: 'select',
        label: 'State',
        name: 'stateId',
        options: [],
        hidden: true,
        validation: [Validators.required],
        placeholder: 'Select State',
      },
      {
        type: 'input',
        label: 'Name',
        name: 'name',
        validation: [Validators.required],
        placeholder: 'Enter Name',
      },
      {
        type: 'input',
        label: 'Latitude',
        name: 'latitude',
        validation: [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)],
      },
      {
        type: 'input',
        label: 'Longitude',
        name: 'longitude',
        validation: [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)],
      },
      {
        label: 'Create',
        name: 'submit',
        type: 'button',
        classes: 'btn btn-primary pull-right',
      },
    ];
  }

  save(group): void {
    if (this.loading) {
      this.notify.warn("Please wait for previous request", "Warning!");
      return;
    }
    if(group.valid) {
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
      this.notify.warn("Invalid form data", "Warning!");
    }
  }

  delete(): void {
    this.message.confirm(
      `Are you sure you want to delete city ${this.city.name}?`,
      'Delete City',
      (result) => {
        if (result) {
          this.notify.info("Deleting city");
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
      this._sandbox.cityLoading$.subscribe(
        (loading: boolean) => {
          if (loading) {
            this.ui.setBusy(this.detailCard.nativeElement);
          }
          this.loading = loading;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.cityLoaded$.subscribe(
        (loaded: boolean) => {
          if (loaded) {
            this.ui.clearBusy(this.detailCard.nativeElement);
            if (this.deleting) {
              this.notify.success("City deleted", "Success!");
              this.router.navigate(["locations", "cities"]);
            }
          }
          this.loaded = loaded;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.cityFailed$.subscribe(
        (failed: boolean) => {
          if (failed) {
            this.ui.clearBusy(this.detailCard.nativeElement);
            if (this.deleting) {
              this.notify.success("Could not delete city", "Error!");
              this.deleting = false;
            }
          }
          this.failed = failed;
        }
      )
    );
    this.subscriptions.push(
      this._sandbox.city$.subscribe((city: City) => (this.city = city))
    );
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((c: Country[]) => {
        if (c) {
          this.config[nameIndexMap.countryId].options = Object.values(c).map((c) => {
            return {
              name: c.name,
              value: c.id,
            }
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
      this._sandbox.statesData$.subscribe((s: State[]) => {
        if (s) {
          const values = Object.values(s);
          this.config[nameIndexMap.stateId].hidden = values.length === 0;
          this.config[nameIndexMap.stateId].options = values.map((s) => {
            return {
              name: s.name,
              value: s.id,
            }
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
    control.validation = [Validators.required, FormHelper.inValidator(countryIds)];
  }

  setStateValidators(): void {
    const control = this.config[nameIndexMap.stateId];
    if (control.options.length === 0) {
      control.validation = [];
    } else {
      const stateIds = control.options.map((s) => s.value.toString());
      control.validation = [Validators.required, FormHelper.inValidator(stateIds)];
    }
  }
}
