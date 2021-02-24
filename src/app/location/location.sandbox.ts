import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import { 
  SearchCityForm, 
  SearchCountryForm, 
  SearchLocationForm, 
  SearchStateForm, 
  CityCreateForm, 
  StateCreateForm, 
  CountryCreateForm, 
  LocationCreateForm 
} from './models/form/';
import { LocationState, locationActions, locationSelectors } from './store';

@Injectable()
export class LocationSandbox extends Sandbox {

  private subscriptions: Array<Subscription> = [];
  
  citiesData$ = this.store.pipe(select(locationSelectors.getCitiesList));
  citiesMeta$ = this.store.pipe(select(locationSelectors.getCitiesMeta));

  constructor(
    protected store: Store<LocationState>,
    private _router: Router,
    protected injector: Injector
  ) {
    super(injector);
  }

  fetchCities(criteria: RequestCriteria<SearchCityForm>): void {
    this.store.dispatch(
      locationActions.doFetchCities({ requestCriteria: criteria })
    );
  }

  fetchCity(id: string): void {
    this.store.dispatch(
      locationActions.doFetchCity({ id: id })
    );
  }

  createCity(form: CityCreateForm): void {
    this.store.dispatch(
      locationActions.doCreateCity({ form: form })
    );
  }
  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
