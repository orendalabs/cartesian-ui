import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: 'paginations.component.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationsComponent {
  constructor() {}

  totalItems = 64;
  currentPage = 4;
  smallnumPages = 0;

  maxSize = 5;
  bigTotalItems = 675;
  bigCurrentPage = 1;
  numPages = 0;

  currentPager = 4;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
