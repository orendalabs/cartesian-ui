import { Injectable, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Sandbox } from '@app/core/base.sandbox';
import {
  SearchTenantForm,
  TenantCreateForm,
  TenantUpdateForm
} from './models/form/';
import { TenantState,
  tenantActions,
  tenantSelectors
} from './store';

@Injectable()
export class TenantSandbox extends Sandbox {

  tenantLoading$ = this.store.pipe(select(tenantSelectors.getTenantLoading));
  tenantLoaded$ = this.store.pipe(select(tenantSelectors.getTenantLoaded));
  tenantFailed$ = this.store.pipe(select(tenantSelectors.getTenantFailed));
  tenant$ = this.store.pipe(select(tenantSelectors.getTenantDetail));

  tenantsLoading$ = this.store.pipe(select(tenantSelectors.getTenantsLoading));
  tenantsLoaded$ = this.store.pipe(select(tenantSelectors.getTenantsLoaded));
  tenantsFailed$ = this.store.pipe(select(tenantSelectors.getTenantsFailed));
  tenants$ = this.store.pipe(select(tenantSelectors.getTenantsList));
  tenantsMeta$ = this.store.pipe(select(tenantSelectors.getTenantsMeta));

  constructor(
    protected store: Store<TenantState>,
    protected injector: Injector
  ) {
    super(injector);
  }

  /**
   * Dispatches fetch tenants action
   * @param criteria Request Criteria for tenants
   */
  fetchTenants(criteria: RequestCriteria<SearchTenantForm>): void {
    this.store.dispatch(
      tenantActions.doFetchTenants({ requestCriteria: criteria })
    );
  }

  /**
   * Dispatches fetch tenant action
   * @param id ID of the tenant to fetch
   */
  fetchTenant(id: string): void {
    this.store.dispatch(tenantActions.doFetchTenant({ id }));
  }

  /**
   * Dispatches create tenant action
   * @param form Form containing data of tenant to create
   */
  createTenant(form: TenantCreateForm): void {
    this.store.dispatch(tenantActions.doCreateTenant({ form }));
  }

  /**
   * Dispatches update tenant action
   * @param form Form containing data of tenant to update
   */
  updateTenant(id: string, form: TenantUpdateForm): void {
    this.store.dispatch(tenantActions.doUpdateTenant({ id , form }));
  }

  /**
   * Dispatches delete tenant action
   * @param id ID of the tenant to delete
   */
  deleteTenant(id: string): void {
    this.store.dispatch(tenantActions.doDeleteTenant({ id }));
  }
}
