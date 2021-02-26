import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Location } from '@app/location/models/domain';
import { LocationUpdateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'location-detail',
  templateUrl: './location-detail.component.html',
})
export class LocationDetailComponent implements OnInit {

  formGroup = new FormGroup({
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });
  
  subscriptions: Array<Subscription> = [];
  location: Location;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
  }

  delete(): void {
    if(confirm("Are you sure you want to delete location " + this.location.id + "?")) {
      
    }
  }

  save(): void {
    if (this.formGroup.valid) {
      const form = new LocationUpdateForm({
        id: this.location.id,
        addressLine1: this.formGroup.controls['addressLine1'].value,
        addressLine2: this.formGroup.controls['addressLine2'].value,
        countryId: this.formGroup.controls['countryId'].value,
        stateId: this.formGroup.controls['stateId'].value,
        cityId: this.formGroup.controls['cityId'].value,
        postCode: this.formGroup.controls['postCode'].value,
        latitude: this.formGroup.controls['latitude'].value,
        longitude: this.formGroup.controls['longitude'].value,
      });
      this._sandbox.updateLocation(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => { 
        const id = params.id;
        this._sandbox.fetchLocation(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.locationLoading$.subscribe((loading: boolean) => this.loading = loading)
    );
    this.subscriptions.push(
      this._sandbox.locationLoaded$.subscribe((loaded: boolean) => this.loaded = loaded)
    );
    this.subscriptions.push(
      this._sandbox.locationFailed$.subscribe((failed: boolean) => this.failed = failed)
    );
    this.subscriptions.push(
      this._sandbox.location$.subscribe((location: Location) => this.location = location)
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
