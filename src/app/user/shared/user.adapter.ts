import { Injectable } from '@angular/core';
import { convertObjectKeysToCamel } from '@cartesian-ui/ng-axis';

@Injectable()
export class UserAdapter {
  constructor() {}

  /**
   * Camelize response keys
   *
   * @param object token get user, authenticated user, register user api's response
   */
  static userAdapter(user: any): any {
    return Object.assign({}, user, convertObjectKeysToCamel(user));
  }
}
