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

  protected abstract list(): void;

  protected abstract delete(): void;

  protected abstract registerEvents(): void;

  protected abstract unregisterEvents(): void;
}
