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
  selector: 'axis-modal-header',
  templateUrl: './axis-modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisModalHeaderComponent extends AppBaseComponent {
  @Input() title: string;

  @Output() onCloseClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
