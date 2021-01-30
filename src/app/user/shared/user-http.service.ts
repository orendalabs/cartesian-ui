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
import { UserAdapter } from './user.adapter';
import { SearchUserForm } from '../models/form/search-user.model';
import { AdminUserCreateForm } from '../models/form/admin-user.model';
import { EditUserForm } from '../models/form/edit-user.model';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class UserHttpService extends HttpService {
  /**
   * Fetch users list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/users')
  // @Adapter(UserAdapter.userAdapter)
  public users(
    @Criteria criteria: RequestCriteria<SearchUserForm>
  ): Observable<any> {
    return null;
  }

  /**
   * Fetch clients list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/clients')
  public clients(
    @Criteria criteria: RequestCriteria<SearchUserForm>
  ): Observable<any> {
    return null;
  }

  /**
   * Fetch admins list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/admins')
  public admins(
    @Criteria criteria: RequestCriteria<SearchUserForm>
  ): Observable<any> {
    return null;
  }

  /**
   * Fetch user details
   *
   * @param id Id of the user to fetch
   */
  @GET('/users/{id}')
  @Adapter(UserAdapter.userAdapter)
  public user(@Path("id") id: string): Observable<any> {
    return null;
  }

  /**
   * Create admin user
   *
   * @param data Data of the user to create
   */
  @POST('/admins')
  public createAdminUser(@Body form: AdminUserCreateForm): Observable<any> {
    return null;
  }

  /**
   * Update user
   *
   * @param id id of the user to update
   * @param data data of the user to update
   */
  @PUT('/users/{id}')
  public updateUser(@Path("id") id: string, @Body form: EditUserForm): Observable<any> {
    return null;
  }

  /**
   * Delete user
   *
   * @param id Id of the user to delete
   */
  @DELETE('/users/{id}')
  @Adapter(UserAdapter.userAdapter)
  public deleteUserById(@Path("id") id: string): Observable<any> {
    return null;
  }

  /**
   * Fetch authenticated user details
   *
   */
  @GET('/user/profile')
  public profile(@Body token: string): Observable<any> {
    return null;
  }
}
