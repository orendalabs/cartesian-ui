import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@app/core/ui';
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
export class StateDetailComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild('detailCard') detailCard: ElementRef;
  @ViewChild('formCard') formCard: ElementRef;

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
  deleting: boolean;

  countries: Country[] = [];
  countriesLoading: boolean;
  countriesLoaded: boolean;
  countriesFailed: boolean;

  countriesCriteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(100000);

  constructor(
    private injector: Injector,
    private _sandbox: LocationSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.registerEvents();
    this._sandbox.fetchCountries(this.countriesCriteria);
  }

  delete(): void {
    this.message.confirm(
      `Are you sure you want to delete country ${this.state.name}?`,
      'Delete State',
      (result) => {
        if (result) {
          this._sandbox.deleteState(this.state.id);
        }
      }
    );
  }

  save(group): void {
    if (this.loading) {
      this.notify.warn('Please wait for the previous request', 'Warning!');
      return;
    }
    if (group.valid) {
      const form = new StateUpdateForm({
        id: this.state.id,
        countryId: group.controls.countryId.value,
        name: group.controls.name.value,
        code: group.controls.code.value,
      });
      this._sandbox.updateState(form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
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
      this._sandbox.stateLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
          this.config[3].disabled = true;
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.stateLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.success('State deleted', 'Success!');
            this.router.navigate(['locations', 'states']);
          }
          this.config[3].disabled = false;
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.stateFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
          if (this.deleting) {
            this.notify.error('Could not delete state', 'Error!');
            this.deleting = false;
          }
          this.config[3].disabled = false;
        }
        this.failed = failed;
      })
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
