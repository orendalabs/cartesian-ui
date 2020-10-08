import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Renderer2,
} from '@angular/core';
import { BaseComponent } from '@app/core/ui';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
  }

  showTenantChange(): boolean {
    return this.multiTenancy.isEnabled;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
  }
}
