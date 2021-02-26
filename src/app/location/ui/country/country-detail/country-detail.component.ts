import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country } from '@app/location/models/domain';
import { CountryUpdateForm } from '@app/location/models/form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'country-detail',
  templateUrl: './country-detail.component.html',
})
export class CountryDetailComponent implements OnInit {

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

  subscriptions: Array<Subscription> = [];
  country: Country;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
  }

  delete(): void {
    if(confirm("Are you sure you want to delete country " + this.country.name + "?")) {
      
    }
  }

  save(): void {
    if (this.formGroup.valid) {
      const form = new CountryUpdateForm({
        id: this.country.id,
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
      this._sandbox.updateCountry(form);
    }
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = params.id;
        this._sandbox.fetchCountry(id);
      })
    );
    this.subscriptions.push(
      this._sandbox.countryLoading$.subscribe((loading: boolean) => this.loading = loading)
    );
    this.subscriptions.push(
      this._sandbox.countryLoaded$.subscribe((loaded: boolean) => this.loaded = loaded)
    );
    this.subscriptions.push(
      this._sandbox.countryFailed$.subscribe((failed: boolean) => this.failed = failed)
    );
    this.subscriptions.push(
      this._sandbox.country$.subscribe((country: Country) => this.country = country)
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
