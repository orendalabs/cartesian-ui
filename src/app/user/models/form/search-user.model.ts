import { WhereItem } from '@cartesian-ui/ng-axis';

export class SearchUserForm {
  name: WhereItem = { column: 'name', operator: '=', value: null };
  email: WhereItem = { column: 'email', operator: '=', value: null };
}
