import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { City } from '@app/location/models/domain';
import { SearchCityForm } from '@app/location/models/form';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'city-list',
  templateUrl: './city-list.component.html',
})
export class CityListComponent extends ListingControlsComponent<City, SearchCityForm> implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  subscriptions: Array<Subscription> = [];
  selectedCities: City[] = [];
  criteria = new RequestCriteria<SearchCityForm>(new SearchCityForm()).limit(2)
  searchModel = '';

  constructor(
    protected _sandbox: LocationSandbox,
    injector: Injector,
    ) { 
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
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
      this._sandbox.citiesData$.subscribe((data: City[]) => {
        if (data) {
          this.data = Object.values(data);
        }
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.citiesMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta.pagination;
        }
      })
    );
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchCities(this.criteria);
  }
  protected delete(): void {
    
  }
  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSelect({ selected }) {
    this.selectedCities.splice(0, this.selectedCities.length);
    this.selectedCities.push(...selected);
  }

  onActivate(event) {}

}
