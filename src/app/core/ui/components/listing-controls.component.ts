import { ElementRef, Injector, ViewChild } from '@angular/core';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { BaseComponent } from './base.component';
import { IPaginationModel } from '../../models';

export abstract class ListingControlsComponent<
  TDataModel,
  TSearchFormModel
  > extends BaseComponent {
  criteria: RequestCriteria<TSearchFormModel>;
  data: Array<TDataModel>;
  pagination: IPaginationModel;
  isTableLoading = false;

  // Checkbox properties
  selectedItemIds: Array<string> = [];
  checkedBoxes = [];

  constructor(injector: Injector) {
    super(injector);
    this.pagination = {
      current_page: 1,
      per_page: 30,
    };
  }

  reloadTable(): void {
    this.list();
  }

  getCurrentPage(): number {
    return this.pagination.current_page;
  }

  getOffsetFromPagination(): number {
    return this.covertPageNumberToOffset(this.getCurrentPage());
  }

  setPage(event): void {
    this.criteria.page(this.covertOffsetToPageNumber(event.offset));
    this.reloadTable();
  }

  setSorting(event): void {
    this.reloadTable();
  }

  covertPageNumberToOffset(pageNumber: number): number {
    return pageNumber - 1;
  }

  covertOffsetToPageNumber(offset: number): number {
    return offset + 1;
  }

  // Checkbox handling functions
  onListItemCheckBoxChange(event, id) {
    if (event.target.checked) {
      this.onCheckItem(event.target, id);
      this.checkedBoxes.push(event.target);
    } else {
      this.onUncheckItem(event.target, id);
    }
  }

  onCheckItem(checkBox: any, id: string) {
    this.selectedItemIds.push(id);
    this.checkedBoxes.push(checkBox);
  }

  onUncheckItem(checkBox: any, id: string) {
    const itemIndex = this.selectedItemIds.indexOf(id);
    const boxIndex = this.checkedBoxes.indexOf(checkBox);
    this.selectedItemIds.splice(itemIndex, 1);
    this.checkedBoxes.splice(boxIndex, 1);
  }

  resetCheckBoxes() {
    this.selectedItemIds = [];
    this.checkedBoxes.forEach((checkBox) => (checkBox.checked = false));
  }

  protected abstract list(): void;

  protected abstract delete(): void;

  protected abstract registerEvents(): void;

  protected abstract unregisterEvents(): void;
}
