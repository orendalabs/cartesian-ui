import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import {
  CityCreateForm,
  SearchCityForm,
  SearchCountryForm,
  SearchStateForm,
} from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain/state.model';
import { Subscription } from 'rxjs';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';

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
export class CityCreateComponent implements OnInit {

  config: FieldConfig[];

  subscriptions: Subscription[] = [];

  countriesLoading: boolean;
  countriesCriteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(100000);

  statesLoading: boolean;
  statesCriteria = new RequestCriteria<SearchStateForm>(
    new SearchStateForm()
  ).limit(100000);

  constructor(protected _sandbox: LocationSandbox) {}

  ngOnInit(): void {
    this.initConfig();
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

  create(group): void {
    if(group.valid) {
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
        this.countriesLoading = loading;
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
        this.statesLoading = loading;
      })
    );
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
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
