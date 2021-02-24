/* tslint:disable:max-line-length */
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { LocationState } from './location.state';
import { locationFeatureKey } from './location.reducer';

export const getLocationState = createFeatureSelector<LocationState>(locationFeatureKey);

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
