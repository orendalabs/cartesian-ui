import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { TenantHttpService } from '../shared/';
import * as tenantActions from './tenant.action';

@Injectable()
export class TenantEffects {
  constructor(
    private actions$: Actions,
    private tenantHttpService: TenantHttpService,
    private store: Store<State>
  ) {}

  /**
   * Fetch Tenants effect
   */
  fetchTenants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tenantActions.doFetchTenants),
      map((action) => action.requestCriteria),
      switchMap((criteria) => {
        return this.tenantHttpService.fetchTenants(criteria).pipe(
          map((tenants) =>
            tenantActions.doFetchTenantsSuccess({
              tenants,
            })
          ),
          catchError((error) => of(tenantActions.doFetchTenantsFail()))
        );
      })
    )
  );

  /**
   * Fetch Tenant effect
   */
  fetchTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tenantActions.doFetchTenant),
      map((action) => action.id),
      switchMap((id) => {
          return this.tenantHttpService.fetchTenant(id).pipe(
          map((tenant) =>
            tenantActions.doFetchTenantSuccess({
              tenant: tenant.data,
            })
          ),
          catchError((error) => of(tenantActions.doFetchTenantFail()))
        );
      })
    )
  );

  /**
   * Create Tenant effect
   */
  createTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tenantActions.doCreateTenant),
      map((action) => action.form),
      switchMap((form) => {
        return this.tenantHttpService.createTenant(form).pipe(
          map((tenant) =>
            tenantActions.doCreateTenantSuccess({
              tenant: tenant.data,
            })
          ),
          catchError((error) => of(tenantActions.doCreateTenantFail()))
        );
      })
    )
  );

  /**
   * Update Tenant effect
   */
  updateTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tenantActions.doUpdateTenant),
      map((action) => Object.assign({}, { id: action.id, form: action.form })),
      switchMap((data) => {
        return this.tenantHttpService.updateTenant(data.id, data.form).pipe(
          map((tenant) =>
            tenantActions.doUpdateTenantSuccess({
              tenant: tenant.data,
            })
          ),
          catchError((error) => of(tenantActions.doUpdateTenantFail()))
        );
      })
    )
  );

  /**
   * Delete Tenant effect
   */
  deleteTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tenantActions.doDeleteTenant),
      map((action) => action.id),
      switchMap((id) => {
        return this.tenantHttpService.deleteTenant(id).pipe(
          map((tenant) =>
            tenantActions.doDeleteTenantSuccess({
              tenant: tenant.data,
            })
          ),
          catchError((error) => of(tenantActions.doDeleteTenantFail()))
        );
      })
    )
  );
}
