import { Injectable } from "@angular/core";
import { WhereItem } from "@cartesian-ui/ng-axis";

@Injectable()
export class SearchPermissionForm {
    id: WhereItem = { column: 'id', operator: '=', value: null };
    name: WhereItem = { column: 'name', operator: '=', value: null };
}