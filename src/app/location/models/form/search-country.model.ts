import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesian-ui/ng-axis';

@Injectable()
export class SearchCountryForm {
  name: WhereItem = { column: 'name', operator: '=', value: null };
  code: WhereItem = { column: 'code', operator: '=', value: null };
  capital: WhereItem = { column: 'capital', operator: '=', value: null };
}
