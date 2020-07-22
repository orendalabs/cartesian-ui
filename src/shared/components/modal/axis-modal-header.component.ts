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
  selector: 'axis-modal-header',
  templateUrl: './axis-modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisModalHeaderComponent extends AppComponentBase {
  @Input() title: string;

  @Output() onCloseClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
