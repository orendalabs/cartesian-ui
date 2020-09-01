import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'axis-modal-footer',
  templateUrl: './axis-modal-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisModalFooterComponent extends AppComponentBase {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;
  @Input() saveLabel = this.l('Save');
  @Input() saveDisabled: boolean;

  @Output() onCancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
