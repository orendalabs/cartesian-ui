import { Injectable } from '@angular/core';
import {
  Adapter,
  Body,
  Criteria,
  DefaultHeaders,
  DELETE,
  GET,
  Header,
  HttpService,
  Path,
  POST,
  RequestCriteria,
} from '@cartesian-ui/ng-axis';
import { Observable } from 'rxjs';
import { CreateRoleForm } from '../models/create/role.model';
import { ManagePermissionForm } from '../models/manage/permission.model';
import { ManageRoleForm } from '../models/manage/role.model';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class AuthHttpService extends HttpService {
  /**
   * Submits assign role form to the server
   * @param form The form to be submitted as body
   */
  @POST('/roles/assign')
  public assignRole(@Body form: ManageRoleForm): Observable<any> {
    return null;
  }

  /**
   * Submits revoke role form to the server
   * @param form The form to be submitted as body
   */
  @POST('/roles/revoke')
  public revokeRole(@Body form: ManageRoleForm): Observable<any> {
    return null;
  }

  @POST('/roles/sync')
  public syncRole(@Body form: ManageRoleForm): Observable<any> {
    return null;
  }

  @GET('/roles')
  public fetchRoles(@Criteria criteria: RequestCriteria<any>): Observable<any> {
    return null;
  }

  @GET('/roles/{id}')
  public fetchRoleById(@Path('id') id: string): Observable<any> {
    return null;
  }

  @POST('/roles')
  public createRole(@Body form: CreateRoleForm): Observable<any> {
    return null;
  }

  @DELETE('/roles/{id}')
  public deleteRoleById(@Path('id') id: string): Observable<any> {
    return null;
  }

  @GET('/permissions')
  public fetchPermissions(@Criteria criteria: RequestCriteria<any>): Observable<any> {
    return null;
  }

  @GET('/permissions/{id}')
  public fetchPermission(@Path('id') id: string): Observable<any> {
    return null;
  }

  @POST('/permissions/attach')
  public attachPermission(@Body form: ManagePermissionForm): Observable<any> {
    return null;
  }

  @POST('/permissions/detach')
  public detachPermission(@Body form: ManagePermissionForm): Observable<any> {
    return null;
  }

  @POST('/permissions/sync')
  public syncPermissions(@Body form: ManagePermissionForm): Observable<any> {
    return null;
  }
}
