import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpService,
  POST,
  GET,
  Body,
  Criteria,
  DefaultHeaders,
  Adapter,
  RequestCriteria,
  Path,
  DELETE,
  PUT,
} from '@cartesian-ui/ng-axis';
import { LocationAdapter } from './location.adapter';
import { 
  SearchCityForm, 
  SearchCountryForm, 
  SearchLocationForm, 
  SearchStateForm, 
  CityCreateForm, 
  StateCreateForm, 
  CountryCreateForm, 
  LocationCreateForm 
} from '../models/form/';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})
export class LocationHttpService extends HttpService {
  /**
   * Fetch cities list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/cities')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchCities(@Criteria criteria: RequestCriteria<SearchCityForm>): Observable<any> {
    return null;
  }

  /**
   * Fetch city
   *
   * @param id Id of city to fetch
   */
  @GET('/cities/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchCity(@Path('id') id: string): Observable<any> {
    return null;
  }
  
  /**
   * Fetch countries list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/countries')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchCountries(@Criteria criteria: RequestCriteria<SearchCountryForm>): Observable<any> {
    return null;
  }

    
  /**
   * Fetch country
   *
   * @param id Id of country to fetch
   */
  @GET('/countries/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchCountry(@Path('id') id: string): Observable<any> {
    return null;
}

  /**
   * Fetch locations list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/locations')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchLocations(@Criteria criteria: RequestCriteria<SearchLocationForm>): Observable<any> {
    return null;
  }

  
  /**
   * Fetch location
   *
   * @param id Id of location to fetch
   */
  @GET('/locations/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchLocation(@Path('id') id: string): Observable<any> {
    return null;
  }

  /**
   * Fetch states list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/states')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchStates(@Criteria criteria: RequestCriteria<SearchStateForm>): Observable<any> {
    return null;
  }

  
  /**
   * Fetch state list
   *
   * @param id Id of state to fetch
   */
  @GET('/states/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchState(@Path('id') id: string): Observable<any> {
    return null;
  }
}
