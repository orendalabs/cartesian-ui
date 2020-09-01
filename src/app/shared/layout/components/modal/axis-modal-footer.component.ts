import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { AppBaseComponent } from '@shared/layout';

@Component({
  selector: 'axis-modal-footer',
  templateUrl: './axis-modal-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisModalFooterComponent extends AppBaseComponent {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;
  @Input() saveLabel = this.l('Save');
  @Input() saveDisabled: boolean;

  @Output() onCancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
