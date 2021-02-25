/* tslint:disable:max-line-length */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { LocationState } from './location.state';
import { locationFeatureKey } from './location.reducer';

export const getLocationState = createFeatureSelector<LocationState>(locationFeatureKey);

// Location Selectors

export const getLocationLoading: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationDetail.loading
);

export const getLocationLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationDetail.loaded
);

export const getLocationFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationDetail.failed
);

export const getLocationDetail: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationDetail.data
);

export const getLocationsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(getLocationState, (state: LocationState) => state.locationListing.loading);

export const getLocationsLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationListing.loaded
);

export const getLocationsFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationListing.failed
);

export const getLocationsList: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationListing.data.data
);

export const getLocationsMeta: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.locationListing.data.meta
);

// City Selectors

export const getCityLoading: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityDetail.loading
);

export const getCityLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityDetail.loaded
);

export const getCityFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityDetail.failed
);

export const getCityDetail: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityDetail.data
);

export const getCitiesLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(getLocationState, (state: LocationState) => state.cityListing.loading);

export const getCitiesLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityListing.loaded
);

export const getCitiesFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityListing.failed
);

export const getCitiesList: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityListing.data.data
);

export const getCitiesMeta: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.cityListing.data.meta
);

// Country Selectors

export const getCountryLoading: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryDetail.loading
);

export const getCountryLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryDetail.loaded
);

export const getCountryFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryDetail.failed
);

export const getCountryDetail: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryDetail.data
);

export const getCountriesLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(getLocationState, (state: LocationState) => state.countryListing.loading);

export const getCountriesLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryListing.loaded
);

export const getCountriesFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryListing.failed
);

export const getCountriesList: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryListing.data.data
);

export const getCountriesMeta: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.countryListing.data.meta
);

// State Selectors

export const getStateLoading: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateDetail.loading
);

export const getStateLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateDetail.loaded
);

export const getStateFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateDetail.failed
);

export const getStateDetail: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateDetail.data
);

export const getStatesLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(getLocationState, (state: LocationState) => state.stateListing.loading);

export const getStatesLoaded: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateListing.loaded
);

export const getStatesFailed: MemoizedSelector<object, boolean> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateListing.failed
);

export const getStatesList: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateListing.data.data
);

export const getStatesMeta: MemoizedSelector<object, object> = createSelector(
  getLocationState,
  (state: LocationState) => state.stateListing.data.meta
);
