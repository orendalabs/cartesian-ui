import { Injector, ElementRef } from '@angular/core';
import { AppConstants } from '@cartesian-ui/ng-axis';
import {
  LocalizationService,
  PermissionCheckerService,
  FeatureCheckerService,
  NotifyService,
  SettingService,
  MessageService,
  MultiTenancyService,
} from '@cartesian-ui/ng-axis';

import { SessionService } from '@shared/services/session.service';

export abstract class BaseComponent {
  localizationSourceName =
    AppConstants.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permission: PermissionCheckerService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  setting: SettingService;
  message: MessageService;
  multiTenancy: MultiTenancyService;
  appSession: SessionService;
  elementRef: ElementRef;

  constructor(injector: Injector) {
    this.localization = injector.get(LocalizationService);
    this.permission = injector.get(PermissionCheckerService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(MultiTenancyService);
    this.appSession = injector.get(SessionService);
    this.elementRef = injector.get(ElementRef);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localize(
      key,
      this.localizationSourceName
    );

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return axis.utils.formatString.apply(this, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }
}
