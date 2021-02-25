import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { FormHelper } from '@app/shared/helpers';
import { LocationCreateForm } from '../../../models/form/'

@Component({
  selector: 'location-create',
  templateUrl: './location-create.component.html',
})
export class LocationCreateComponent implements OnInit {

  formGroup = new FormGroup({
    locatableType: new FormControl('', [Validators.required]),
    locatableId: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });
  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    
  }

  create(): void {
    if(this.formGroup.valid) {
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
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }

}
