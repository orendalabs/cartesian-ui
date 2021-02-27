import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { CityCreateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';

@Component({
  selector: 'city-create',
  templateUrl: './city-create.component.html',
})
export class CityCreateComponent implements OnInit {

  formGroup = new FormGroup({
    countryId: new FormControl('', Validators.required),
    stateId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    latitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, FormHelper.isFloatValidator(), Validators.min(-180), Validators.max(180)]),
  });
  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    
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

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }
}
