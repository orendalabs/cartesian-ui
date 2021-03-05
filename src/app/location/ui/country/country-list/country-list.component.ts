import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ListingControlsComponent } from '@app/core/ui';
import { LocationSandbox } from '@app/location/location.sandbox';
import { Country } from '@app/location/models/domain';
import { SearchCountryForm } from '@app/location/models/form';
import { RequestCriteria } from '@cartesian-ui/ng-axis';
import { Subscription } from 'rxjs';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
})
export class CountryListComponent
  extends ListingControlsComponent<Country, SearchCountryForm>
  implements OnInit, AfterViewInit {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  subscriptions: Array<Subscription> = [];
  selectedCountries: Country[] = [];
  criteria = new RequestCriteria<SearchCountryForm>(
    new SearchCountryForm()
  ).limit(2);
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
      this._sandbox.countriesData$.subscribe((data: Country[]) => {
        if (data) {
          this.data = Object.values(data);
        }
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.countriesMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta.pagination;
        }
      })
    );
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchCountries(this.criteria);
  }
  protected delete(): void {}
  protected unregisterEvents(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSelect({ selected }) {
    this.selectedCountries.splice(0, this.selectedCountries.length);
    this.selectedCountries.push(...selected);
  }

  onActivate(event) {}
}
