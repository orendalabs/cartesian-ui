import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector,
} from '@angular/core';
import { BaseComponent } from '@shared/ui';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './app-modal-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModalFooterComponent extends BaseComponent {
  @Input() cancelLabel = this.l('Cancel');
  @Input() cancelDisabled: boolean;
  @Input() saveLabel = this.l('Save');
  @Input() saveDisabled: boolean;

  @Output() cancelClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
