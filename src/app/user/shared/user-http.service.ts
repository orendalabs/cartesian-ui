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
} from '@cartesian-ui/ng-axis';
import { UserAdapter } from './user.adapter';
import { SearchUserForm } from '../models/form/search-user.model';

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
  @Adapter(UserAdapter.userAdapter)
  public users(
    @Criteria criteria: RequestCriteria<SearchUserForm>
  ): Observable<any> {
    return null;
  }

  /**
   * Fetch user details
   *
   */
  @GET('/v1/users/:id')
  @Adapter(UserAdapter.userAdapter)
  public user(): Observable<any> {
    return null;
  }
}
