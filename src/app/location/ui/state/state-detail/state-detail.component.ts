import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country, State } from '@app/location/models/domain';
import { SearchCountryForm, StateUpdateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'state-detail',
  templateUrl: './state-detail.component.html',
})
export class StateDetailComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  });
  
  subscriptions: Array<Subscription> = [];
  state: State;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  countries: Country[] = [];
  countriesCriteria = new RequestCriteria<SearchCountryForm>(new SearchCountryForm()).limit(100000);

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  delete(): void {
    if(confirm("Are you sure you want to delete country " + this.state.name + "?")) {
      this._sandbox.deleteState(this.state.id);
    }
  }

  save(): void {
    if(this.formGroup.valid) {
      const form = new StateUpdateForm({
        id: this.state.id,
        countryId: this.formGroup.controls['countryId'].value,
        name: this.formGroup.controls['name'].value,
        code: this.formGroup.controls['code'].value,
      });
      this._sandbox.updateState(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => { 
        const id = params.id;
        this._sandbox.fetchState(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.stateLoading$.subscribe((loading: boolean) => this.loading = loading)
    );
    this.subscriptions.push(
      this._sandbox.stateLoaded$.subscribe((loaded: boolean) => this.loaded = loaded)
    );
    this.subscriptions.push(
      this._sandbox.stateFailed$.subscribe((failed: boolean) => this.failed = failed)
    );
    this.subscriptions.push(
      this._sandbox.state$.subscribe((state: State) => this.state = state)
    );
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((c: Country[]) => { 
        if (c) {
          this.countries = Object.values(c);
          this.setCountryValidators();
        }
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
