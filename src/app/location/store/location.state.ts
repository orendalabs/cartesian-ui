import { City, Country, Location, State } from '../models/domain';

export interface CityListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<City>;
    meta: object;
  };
}

export interface CityDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: City | null;
}

export interface CountryListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Country>;
    meta: object;
  };
}

export interface CountryDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Country | null;
}

export interface LocationListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Location>;
    meta: object;
  };
}

export interface LocationDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Location | null;
}

export interface StateListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<State>;
    meta: object;
  };
}

export interface StateDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: State | null;
}

export interface LocationState {
  cityListing: CityListingState;
  cityDetail: CityDetailState;
  countryListing: CountryListingState;
  countryDetail: CountryDetailState;
  locationListing: LocationListingState;
  locationDetail: LocationDetailState;
  stateListing: StateListingState;
  stateDetail: StateDetailState;
}
