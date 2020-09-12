import { Injectable } 	 from '@angular/core';
import { convertObjectKeysToCamel } from "@cartesian-ui/ng-axis";

@Injectable()
export class AuthAdapter {


  constructor() {}


  /**
   * Camelize response keys
   *
   * @param token
   */
  static authAdapter(token: any): any {
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
