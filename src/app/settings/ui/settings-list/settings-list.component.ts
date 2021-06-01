import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { SearchSettingForm } from '@app/settings/models/form/search-setting.model';
import { Setting } from '@app/settings/models/setting.model';
import { SettingsSandbox } from '@app/settings/settings.sandbox';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'settings-list',
  templateUrl: './settings-list.component.html',
})
export class SettingsListComponent
  extends ListingControlsComponent<Setting, SearchSettingForm>
  implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  isSettingDeleteSuccess: boolean;

  constructor(
    protected _sandbox: SettingsSandbox,
    injector: Injector
  ) {
    super(injector);
  }

  registerEvents = () => {
    this.subscriptions.push(
      this._sandbox.settingsFetchData$.subscribe(
        (data: Setting[]) => {
          this.data = data;
          this.ui.clearBusy();
          this.isTableLoading = false;
        })
    )
    this.subscriptions.push(
      this._sandbox.settingsFetchMeta$.subscribe(
        (meta: any) => {
          if (meta) {
            this.pagination = meta ? meta.pagination : null;
          }
        })
    )
    this.subscriptions.push(
      this._sandbox.isSettingDeleteSuccess$.subscribe((success) => { if (success) console.log("Deleted") })
    )
  }

  unregisterEvents = () => {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchSettingForm>(
      new SearchSettingForm()
    ).limit(2);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetch(this.criteria);
  }

  protected delete() { }

  deleteSetting = (id) => {
    this._sandbox.delete(id);
  }
}
