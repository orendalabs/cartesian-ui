import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { StateCreateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';

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
  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    
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

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }

}
