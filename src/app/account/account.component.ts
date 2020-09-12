import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Renderer2
} from '@angular/core';
import { BaseComponent } from '@shared/layout';

@Component({
  templateUrl: './account.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
  }

  showTenantChange(): boolean {
    return axis.multiTenancy.isEnabled;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
  }
}
