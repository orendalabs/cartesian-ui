import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
} from '@angular/core';
import { BaseComponent } from '@app/core/ui';
import { accountModuleAnimation } from '@app/core/animations';
import { AccountSandbox } from '../../account.sandbox';

@Component({
  selector: 'app-account',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
})
export class TenantFormComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private _sandbox: AccountSandbox) {
    super(injector);
  }

  ngOnInit(): void {}
}
