import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City } from '@app/location/models/domain';
import { CityUpdateForm } from '@app/location/models/form/update-city.model';
import { FormHelper } from '@app/shared/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'city-detail',
  templateUrl: './city-detail.component.html',
})
export class CityDetailComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    stateId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });

  subscriptions: Array<Subscription> = [];
  city: City;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
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
    if(confirm("Are you sure you want to delete city " + this.city.name + "?")) {
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
  }
  
  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }
}
