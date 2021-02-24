import { ActionReducerMap } from '@ngrx/store';
import { LocationState } from '.';
import { 
  cityDetailReducer,
  cityListingReducer,
  countryDetailReducer,
  countryListingReducer,
  locationDetailReducer,
  locationListingReducer,
  stateDetailReducer,
  stateListingReducer
} from './reducers/'

export const locationFeatureKey = `location`;

export const locationReducers: ActionReducerMap<LocationState> = {
  cityListing: cityListingReducer,
  cityDetail: cityDetailReducer,
  countryListing: countryListingReducer,
  countryDetail: countryDetailReducer,
  locationListing: locationListingReducer,
  locationDetail: locationDetailReducer,
  stateListing: stateListingReducer,
  stateDetail: stateDetailReducer,
};
