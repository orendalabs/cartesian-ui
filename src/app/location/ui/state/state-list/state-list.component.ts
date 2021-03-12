import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { State } from '@app/location/models/domain';
import { SearchStateForm } from '@app/location/models/form';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'state-list',
  templateUrl: './state-list.component.html',
})
export class StateListComponent
  extends ListingControlsComponent<State, SearchStateForm>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  subscriptions: Array<Subscription> = [];
  selectedStates: State[] = [];
  criteria = new RequestCriteria<SearchStateForm>(new SearchStateForm()).limit(
    2
  );
  searchModel = '';

  constructor(protected _sandbox: LocationSandbox, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  search(): void {
    this.setPage(1);
    if (this.searchModel) {
      this.criteria.where('name', 'like', this.searchModel);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  protected registerEvents() {
    this.subscriptions.push(
      this._sandbox.statesData$.subscribe((data: State[]) => {
        if (data) {
          this.data = Object.values(data);
        }
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.statesMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta.pagination;
        }
      })
    );
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchStates(this.criteria);
  }

  protected delete(): void {

  }

  onSelect({ selected }) {
    this.selectedStates.splice(0, this.selectedStates.length);
    this.selectedStates.push(...selected);
  }

  onActivate(event) {

  }
}
