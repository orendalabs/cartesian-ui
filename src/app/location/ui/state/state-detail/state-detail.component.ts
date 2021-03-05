import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country, State } from '@app/location/models/domain';
import { SearchCountryForm, StateUpdateForm } from '@app/location/models/form';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'state-detail',
  templateUrl: './state-detail.component.html',
})
export class StateDetailComponent implements OnInit {
  config: FieldConfig[] = [
    {
      type: 'select',
      label: 'Country',
      name: 'countryId',
      options: [],
      placeholder: 'Select Country...',
      validation: [Validators.required],
    },
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      placeholder: 'Enter name',
    },
    {
      type: 'input',
      label: 'Code',
      name: 'code',
      validation: [Validators.required],
      placeholder: 'Enter code',
    },
    {
      label: 'Save',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  subscriptions: Array<Subscription> = [];
  state: State;
  loaded: boolean;
  loading: boolean;
  failed: boolean;

  countries: Country[] = [];
  countriesCriteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(100000);

  constructor(
    protected _sandbox: LocationSandbox,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  delete(): void {
    if (
      confirm(
        'Are you sure you want to delete country ' + this.state.name + '?'
      )
    ) {
      this._sandbox.deleteState(this.state.id);
    }
  }

  save(group): void {
    if (group.valid) {
      const form = new StateUpdateForm({
        id: this.state.id,
        countryId: group.controls.countryId.value,
        name: group.controls.name.value,
        code: group.controls.code.value,
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
      this._sandbox.stateLoading$.subscribe(
        (loading: boolean) => (this.loading = loading)
      )
    );
    this.subscriptions.push(
      this._sandbox.stateLoaded$.subscribe(
        (loaded: boolean) => (this.loaded = loaded)
      )
    );
    this.subscriptions.push(
      this._sandbox.stateFailed$.subscribe(
        (failed: boolean) => (this.failed = failed)
      )
    );
    this.subscriptions.push(
      this._sandbox.state$.subscribe((state: State) => (this.state = state))
    );
    this.subscriptions.push(
      this._sandbox.countriesData$.subscribe((c: Country[]) => {
        if (c) {
          this.config[0].options = [];
          Object.values(c).forEach((v) => {
            this.config[0].options.push({
              name: v.name,
              value: v.id,
            });
          });
        }
      })
    );
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  setCountryValidators(): void {
    if (this.config[0].options) {
      const countryIds = this.config[0].options.map((c) => c.value.toString());
      this.config[0].validation = [
        Validators.required,
        FormHelper.inValidator(countryIds),
      ];
    }
  }
}
