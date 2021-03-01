import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City, Country } from '@app/location/models/domain';
import { SearchCountryForm, SearchStateForm } from '@app/location/models/form';
import { CityUpdateForm } from '@app/location/models/form/update-city.model';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { State } from '@app/location/models/domain';
import { Subscription } from 'rxjs';

@Component({
  selector: 'city-detail',
  templateUrl: './city-detail.component.html',
})
export class CityDetailComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    stateId: new FormControl(''),
    name: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });

  subscriptions: Array<Subscription> = [];
  
  city: City;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  countries: Country[] = [];
  countriesCriteria = new RequestCriteria<SearchCountryForm>(new SearchCountryForm()).limit(100000);

  states: State[] = [];
  statesCriteria = new RequestCriteria<SearchStateForm>(new SearchStateForm()).limit(100000);

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  onCountryInputChange(event): void {
    const id = event.target.value;
    this.states = null;
    this.formGroup.controls['stateId'].reset('');
    this.statesCriteria.where('country_id', '=', id);
    this._sandbox.fetchStates(this.statesCriteria);
  }

  save(): void {
    if (this.formGroup.valid) {
      const form = new CityUpdateForm({
        countryId: this.formGroup.controls['countryId'].value,
        stateId: this.formGroup.controls['stateId'].value,
        id: this.city.id,
        name: this.formGroup.controls['name'].value,
        latitude: this.formGroup.controls['latitude'].value,
        longitude: this.formGroup.controls['longitude'].value
      });
      this._sandbox.updateCity(form);
    }
  }

  delete(): void {
    if(confirm('Are you sure you want to delete city ' + this.city.name + '?')) {
      this._sandbox.deleteCity(this.city.id);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => { 
        const id = params.id;
        this._sandbox.fetchCity(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.cityLoading$.subscribe((loading: boolean) => this.loading = loading)
    );
    this.subscriptions.push(
      this._sandbox.cityLoaded$.subscribe((loaded: boolean) => this.loaded = loaded)
    );
    this.subscriptions.push(
      this._sandbox.cityFailed$.subscribe((failed: boolean) => this.failed = failed)
    );
    this.subscriptions.push(
      this._sandbox.city$.subscribe((city: City) => this.city = city)
    );
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
  
  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }

  setCountryValidators(): void {
    const control = this.formGroup.controls['countryId'];
    const countryIds = this.countries.map((c) => c.id.toString());
    control.setValidators([Validators.required, FormHelper.inValidator(countryIds)]);
    control.updateValueAndValidity();
  }

  setStateValidators(): void {
    const control = this.formGroup.controls['stateId'];
    if (this.states.length == 0) {
      control.clearValidators();
    } else {
      const stateIds = this.states.map((s) => s.id.toString());
      control.setValidators([Validators.required, FormHelper.inValidator(stateIds)]);
    }
    control.updateValueAndValidity();
  }
}
