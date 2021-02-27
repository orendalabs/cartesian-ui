import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { State } from '@app/location/models/domain';
import { StateUpdateForm } from '@app/location/models/form';
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

  constructor(protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerEvents();
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
