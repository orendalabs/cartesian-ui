import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/core/ui';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class UserComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
