import { Injectable } 	 from '@angular/core';
import { convertObjectKeysToCamel } from "@cartesian-ui/ng-axis";

@Injectable()
export class AccountAdapter {


  constructor() {}


  /**
   * Camelize response keys
   *
   * @param token
   */
  static accountAdapter(token: any): any {
    return Object.assign({}, token, convertObjectKeysToCamel(token));
  }


  /**
   * Camelize response keys
   *
   * @param token
   */
  static userAdapter(user: any): any {
    return Object.assign({}, user, convertObjectKeysToCamel(user));
  }
}
