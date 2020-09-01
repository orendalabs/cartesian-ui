import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy
} from '@angular/core';
import { AppBaseComponent } from '@shared/layout';
import * as _ from 'lodash';

@Component({
  selector: 'account-languages',
  templateUrl: './account-languages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountLanguagesComponent extends AppBaseComponent
  implements OnInit {
  languages: axis.localization.ILanguageInfo[];
  currentLanguage: axis.localization.ILanguageInfo;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.languages = _.filter(
      this.localization.languages,
      (l) => !l.isDisabled
    );
    this.currentLanguage = this.localization.currentLanguage;
  }

  changeLanguage(languageName: string): void {
    axis.utils.setCookieValue(
      'Axis.Localization.CultureName',
      languageName,
      new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
      axis.appPath
    );

    location.reload();
  }
}
