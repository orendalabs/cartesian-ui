import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country, State } from '@app/location/models/domain';
import { SearchCountryForm, SearchStateForm, StateCreateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'state-create',
  templateUrl: './state-create.component.html',
})
export class StateCreateComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });

  subscriptions: Subscription[] = [];

  countries: Country[] = [];
  countriesLoading: boolean;
  countriesCriteria = new RequestCriteria<SearchCountryForm>(new SearchCountryForm()).limit(100000);

  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  create(): void {
    if(this.formGroup.valid) {
      const form = new StateCreateForm({
        countryId: this.formGroup.controls['countryId'].value,
        name: this.formGroup.controls['name'].value,
        code: this.formGroup.controls['code'].value,
      });
      this._sandbox.createState(form);
    }
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
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }

  setCountryValidators(): void {
    const control = this.formGroup.controls["countryId"];
    const countryIds = this.countries.map((c) => c.id.toString());
    control.setValidators([Validators.required, FormHelper.inValidator(countryIds)]);
    control.updateValueAndValidity();
  }
}
