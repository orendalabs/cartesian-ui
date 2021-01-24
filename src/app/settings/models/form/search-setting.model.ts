import { Injectable } from "@angular/core";
import { WhereItem } from "@cartesian-ui/ng-axis";

@Injectable()
export class SearchSettingForm {
    key: WhereItem = { column: 'key', operator: '=', value: null };
    value: WhereItem = { column: 'value', operator: '=', value: null };
}