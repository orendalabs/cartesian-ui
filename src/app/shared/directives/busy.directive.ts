import { Directive, ElementRef, Input } from '@angular/core';
import { UiService } from '@cartesian-ui/ng-axis';

@Directive({
  selector: '[busy]',
})
export class BusyDirective {
  constructor(private _element: ElementRef, private _uiService: UiService) {}

  @Input() set busy(isBusy: boolean) {
    this.refreshState(isBusy);
  }

  refreshState(isBusy: boolean): void {
    if (isBusy === undefined) {
      return;
    }

    if (isBusy) {
      this._uiService.setBusy(this._element.nativeElement);
    } else {
      this._uiService.clearBusy(this._element.nativeElement);
    }
  }
}
