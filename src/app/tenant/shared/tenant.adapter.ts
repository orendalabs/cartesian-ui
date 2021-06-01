import { Injectable } from '@angular/core';
import { convertObjectKeysToCamel } from '@cartesian-ui/ng-axis';

@Injectable()
export class TenantAdapter {
  constructor() {}

  /**
   * Camelize response keys
   *
   * @param tenant Object to camelize keys of
   */
  static tenantAdapter(tenant: any): any {
    return Object.assign({}, tenant, convertObjectKeysToCamel(tenant));
  }
}
