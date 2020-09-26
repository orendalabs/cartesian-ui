import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './app-pagination-controls.component.html',
})
export class AppPaginationControlsComponent {
  @Input() id: string;
  @Input() maxSize = 7;
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  private _directionLinks = true;
  private _autoHide = false;

  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = !!value && (value as any) !== 'false';
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = !!value && (value as any) !== 'false';
  }
}
