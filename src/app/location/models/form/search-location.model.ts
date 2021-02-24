import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesian-ui/ng-axis';

@Injectable()
export class SearchLocationForm {
  addressLine1: WhereItem = { column: 'address_line_1', operator: '=', value: null };
  addressLine2: WhereItem = { column: 'address_line_2', operator: '=', value: null };
  postCode: WhereItem = { column: 'post_code', operator: '=', value: null };
}
