import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '@shared/layout';

@Component({
  selector: 'account-footer',
  templateUrl: './account-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFooterComponent extends BaseComponent {
  currentYear: number;
  versionText: string;

  constructor(injector: Injector) {
    super(injector);

    this.currentYear = new Date().getFullYear();
    this.versionText = ""
    //   this.appSession.application.version +
    //   ' [' +
    //   this.appSession.application.releaseDate.format('YYYYDDMM') +
    //   ']';
  }
}
