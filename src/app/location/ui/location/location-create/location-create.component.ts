import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain';
import { Subscription } from 'rxjs';
import { LocationCreateForm, SearchCityForm, SearchCountryForm, SearchStateForm } from '../../../models/form/'

@Component({
  selector: 'location-create',
  templateUrl: './location-create.component.html',
})
export class LocationCreateComponent implements OnInit {

  subscriptions: Subscription[] = [];

  countries: Country[] = [];
  countriesLoading: boolean;
  countriesCriteria = new RequestCriteria<SearchCountryForm>(new SearchCountryForm()).limit(100000);

  states: State[] = [];
  statesLoading: boolean;
  statesCriteria = new RequestCriteria<SearchStateForm>(new SearchStateForm()).limit(100000);

  cities: City[] = [];
  citiesLoading: boolean;
  citiesCriteria = new RequestCriteria<SearchCityForm>(new SearchCityForm()).limit(100000);

  formGroup = new FormGroup({
    locatableType: new FormControl('', [Validators.required]),
    locatableId: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl(''),
    cityId: new FormControl(''),
    postCode: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });
  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  onCountryInputChange(event): void {
    const id = event.target.value;
    this.states = null;
    this.formGroup.controls["stateId"].reset("");
    
    this.cities = [];
    this.formGroup.controls["cityId"].reset("");  
    this.setCityValidators();

    this.statesCriteria.where("country_id", "=", id);
    this._sandbox.fetchStates(this.statesCriteria);
  }

  onStateInputChange(event): void {
    const id = event.target.value;
    this.cities = null;
    this.formGroup.controls["cityId"].reset("");
    this.citiesCriteria.where("state_id", "=", id);
    this._sandbox.fetchCities(this.citiesCriteria);
  }

  create(): void {
    if (this.formGroup.valid) {
      const form = new LocationCreateForm({
        locatableType: this.formGroup.controls['locatableType'].value,
        locatableId: this.formGroup.controls['locatableId'].value,
        addressLine1: this.formGroup.controls['addressLine1'].value,
        addressLine2: this.formGroup.controls['addressLine2'].value,
        countryId: this.formGroup.controls['countryId'].value,
        stateId: this.formGroup.controls['stateId'].value,
        cityId: this.formGroup.controls['cityId'].value,
        postCode: this.formGroup.controls['postCode'].value,
        latitude: this.formGroup.controls['latitude'].value,
        longitude: this.formGroup.controls['longitude'].value,
      });
      this._sandbox.createLocation(form);
    }
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((c: Country[]) => {
        if (c) {
          this.countries = Object.values(c);
          this.setCountryValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesLoading$.subscribe((loading) => {
        this.countriesLoading = loading
      })
    );
    this.subscriptions.push(
      this._sandbox.statesData$.subscribe((s: State[]) => {
        if (s) {
          this.states = Object.values(s);
          this.setStateValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.statesLoading$.subscribe((loading) => {
        this.statesLoading = loading
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesData$.subscribe((c: City[]) => {
        if (c) {
          this.cities = Object.values(c);
          this.setCityValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesLoading$.subscribe((loading) => {
        this.citiesLoading = loading
      })
    );
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  setCountryValidators(): void {
    const control = this.formGroup.controls["countryId"];
    const countryIds = this.countries.map((c) => c.id.toString());
    control.setValidators([FormHelper.inValidator(countryIds)]);
    control.updateValueAndValidity();
  }

  setStateValidators(): void {
    const control = this.formGroup.controls["stateId"];
    if (this.states.length == 0) {
      control.clearValidators();
    } else {
      const stateIds = this.states.map((s) => s.id.toString());
      control.setValidators([FormHelper.inValidator(stateIds)]);
    }
    control.updateValueAndValidity();
  }

  setCityValidators(): void {
    const control = this.formGroup.controls["cityId"];
    if (this.cities.length == 0) {
      control.clearValidators();
    } else {
      const cityIds = this.cities.map((c) => c.id.toString());
      control.setValidators([FormHelper.inValidator(cityIds)]);
    }
    control.updateValueAndValidity();
  }
}
