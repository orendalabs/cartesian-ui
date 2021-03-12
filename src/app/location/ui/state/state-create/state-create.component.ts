import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country } from '@app/location/models/domain';
import { SearchCountryForm, StateCreateForm } from '@app/location/models/form';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { FormHelper } from '@app/shared/helpers';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'state-create',
  templateUrl: './state-create.component.html',
})
export class StateCreateComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('formCard') formCard: ElementRef;
  subscriptions: Subscription[] = [];

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  countriesLoading: boolean;
  countriesLoaded: boolean;
  countriesFailed: boolean;
  countriesCriteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(100000);

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
      label: 'Create',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  constructor(protected injector: Injector,
    protected _sandbox: LocationSandbox) {
      super(injector);
    }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  create(group): void {
    if (group.valid) {
      const form = new StateCreateForm({
        countryId: group.controls.countryId.value,
        name: group.controls.name.value,
        code: group.controls.code.value,
      });
      this._sandbox.createState(form);
    }
  }

  registerEvents(): void {
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
          this.setCountryValidators();
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.formCard.nativeElement);
        }
        this.countriesLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.countriesLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.formCard.nativeElement);
        }
        this.countriesFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.stateLoading$.subscribe((loading) => {
        this.loading = loading;
        if (loading) {
          this.notify.info('Creating state');
          this.config[3].disabled = true;
        }
      })
    )
    this.subscriptions.push(
      this._sandbox.stateLoaded$.subscribe((loaded) => {
        this.loaded = loaded;
        if (loaded) {
          this.notify.success('State created', 'Success!');
          this.config[3].disabled = false;
        }
      })
    )
    this.subscriptions.push(
      this._sandbox.stateFailed$.subscribe((failed) => {
        this.failed = failed;
        if (failed) {
          this.notify.error('Could not create state', 'Error!');
          this.config[3].disabled = false;
        }
      })
    )
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
