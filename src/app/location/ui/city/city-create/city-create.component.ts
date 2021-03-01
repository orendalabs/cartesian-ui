import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import { CityCreateForm, SearchCityForm, SearchCountryForm, SearchStateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain/state.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'city-create',
  templateUrl: './city-create.component.html',
})
export class CityCreateComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    stateId: new FormControl(''),
    name: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });

  subscriptions: Subscription[] = [];

  countries: Country[] = [];
  countriesCriteria = new RequestCriteria<SearchCountryForm>(new SearchCountryForm()).limit(100000);

  states: State[] = [];
  statesCriteria = new RequestCriteria<SearchStateForm>(new SearchStateForm()).limit(100000);

  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  create(): void {
    if(this.formGroup.valid) {
      const form = new CityCreateForm({
        countryId: this.formGroup.controls['countryId'].value,
        stateId: this.formGroup.controls['stateId'].value,
        name: this.formGroup.controls['name'].value,
        latitude: this.formGroup.controls['latitude'].value,
        longitude: this.formGroup.controls['longitude'].value,
      });
      this._sandbox.createCity(form);
    }
  }

  onCountryInputChange(event): void {
    const id = event.target.value;
    this.states = null;
    this.formGroup.controls["stateId"].reset("");
    this.statesCriteria.where("country_id", "=", id);
    this._sandbox.fetchStates(this.statesCriteria);
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
      this._sandbox.statesData$.subscribe((s: State[]) => {
        if (s) {
          this.states = Object.values(s);
          this.setStateValidators();
        }
      })
    );
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  setCountryValidators(): void {
    const control = this.formGroup.controls["countryId"];
    const countryIds = this.countries.map((c) => c.id.toString());
    control.setValidators([Validators.required, FormHelper.inValidator(countryIds)]);
    control.updateValueAndValidity();
  }

  setStateValidators(): void {
    const control = this.formGroup.controls["stateId"];
    if (this.states.length == 0) {
      control.clearValidators();
    } else {
      const stateIds = this.states.map((s) => s.id.toString());
      control.setValidators([Validators.required, FormHelper.inValidator(stateIds)]);
    }
    control.updateValueAndValidity();
  }
}
