import { Injectable } from '@angular/core';
import { convertObjectKeysToCamel } from '@cartesian-ui/ng-axis';

@Injectable()
export class LocationAdapter {
  constructor() {}

  /**
   * Camelize response keys
   *
   * @param object locationObject
   */
  static locationAdapter(loc: any): any {
    return Object.assign({}, loc, convertObjectKeysToCamel(loc));
  }
}
