import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpService,
  POST,
  GET,
  Body,
  Criteria,
  DefaultHeaders,
  Adapter,
  RequestCriteria,
  Path,
  DELETE,
  PUT,
} from '@cartesian-ui/ng-axis';
import { TenantAdapter } from './tenant.adapter';
import {
  SearchTenantForm,
  TenantCreateForm,
  TenantUpdateForm,
} from '../models/form/';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class TenantHttpService extends HttpService {
  /**
   * Fetch tenants list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/tenants')
  @Adapter(TenantAdapter.tenantAdapter)
  public fetchTenants(@Criteria criteria: RequestCriteria<SearchTenantForm>): Observable<any> {
    return null;
  }

  /**
   * Fetch tenant
   *
   * @param id Id of tenant to fetch
   */
  @GET('/tenants/{id}')
  @Adapter(TenantAdapter.tenantAdapter)
  public fetchTenant(@Path('id') id: string): Observable<any> {
    return null;
  }

  /**
   * Create tenant
   *
   * @param form form containing data of tenant
   */
  @POST('/tenants')
  public createTenant(@Body form: TenantCreateForm): Observable<any> {
    return null;
  }

  /**
   * Update tenant
   *
   * @param form form containing data of tenant
   */
  @PUT('/tenants/{id}')
  public updateTenant(@Path('id') id: string, @Body form: TenantUpdateForm): Observable<any> {
    return null;
  }

  /**
   * Delete tenant
   *
   * @param id Id of tenant to delete
   */
  @DELETE('/tenants/{id}')
  @Adapter(TenantAdapter.tenantAdapter)
  public deleteTenant(@Path('id') id: string): Observable<any> {
    return null;
  }
}
