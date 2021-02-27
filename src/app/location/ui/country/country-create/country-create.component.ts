import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationSandbox } from '@app/location/location.sandbox';
import { CountryCreateForm } from '@app/location/models/form';
import { FormHelper } from '@app/shared/helpers';

@Component({
  selector: 'country-create',
  templateUrl: './country-create.component.html',
})
export class CountryCreateComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    native: new FormControl('', [Validators.required]),
    alpha2: new FormControl('', [Validators.required]),
    alpha3: new FormControl('', [Validators.required]),
    isd: new FormControl('', [Validators.required]),
    capital: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    continent: new FormControl('', [Validators.required]),
    subcontinent: new FormControl('', [Validators.required]),
    emoji: new FormControl('', [Validators.required]),
    emojiUnicode: new FormControl('', [Validators.required]),
  });
  constructor(protected _sandbox: LocationSandbox) { }

  ngOnInit(): void {
    
  }

  create(): void {
    if(this.formGroup.valid) {
      const form = new CountryCreateForm({
        name: this.formGroup.controls['name'].value,
        native: this.formGroup.controls['native'].value,
        alpha2: this.formGroup.controls['alpha2'].value,
        alpha3: this.formGroup.controls['alpha3'].value,
        isd: this.formGroup.controls['isd'].value,
        capital: this.formGroup.controls['capital'].value,
        currency: this.formGroup.controls['currency'].value,
        continent: this.formGroup.controls['continent'].value,
        subcontinent: this.formGroup.controls['subcontinent'].value,
        emoji: this.formGroup.controls['emoji'].value,
        emojiUnicode: this.formGroup.controls['emojiUnicode'].value,
      });
      this._sandbox.createCountry(form);
    }
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    return FormHelper.getFormClasses(control);
  }

}
