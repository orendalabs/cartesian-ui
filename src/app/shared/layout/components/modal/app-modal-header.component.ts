import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { BaseComponent } from '@shared/layout';

@Component({
  selector: 'app-modal-header',
  templateUrl: './app-modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModalHeaderComponent extends BaseComponent {
  @Input() title: string;

  @Output() onCloseClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
