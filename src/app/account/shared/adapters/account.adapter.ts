import { Injectable } 	 from '@angular/core';
import { convertObjectKeysToCamel } from "@cartesian-ui/ng-axis";

@Injectable({
  providedIn: "root"
})
export class AccountAdapter {


  constructor() {}


  /**
   * Camelize response keys
   *
   * @param token
   */
  static AccountAdapter(token: any): any {
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
