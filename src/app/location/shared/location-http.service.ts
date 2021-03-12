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
  LocationCreateForm,
  CityUpdateForm,
  LocationUpdateForm,
  StateUpdateForm,
  CountryUpdateForm
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
   * Create city
   *
   * @param form form containing data of city
   */
  @POST('/cities')
  public createCity(@Body form: CityCreateForm): Observable<any> {
    return null;
  }
  
  /**
   * Update city
   *
   * @param form form containing data of city
   */
  @PUT('/cities/{id}')
  public updateCity(@Path('id') id: string, @Body form: CityUpdateForm): Observable<any> {
    return null;
  }

  /**
   * Delete city
   *
   * @param id Id of city to delete
   */
  @DELETE('/cities/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public deleteCity(@Path('id') id: string): Observable<any> {
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
   * Create country
   *
   * @param form form containing data of country
   */
  @POST('/countries')
  public createCountry(@Body form: CountryCreateForm): Observable<any> {
    return null;
  }

  /**
   * Update country
   *
   * @param form form containing data of country
   */
  @PUT('/countries/{id}')
  public updateCountry(@Path('id') id: string, @Body form: CountryUpdateForm): Observable<any> {
    return null;
  }

  /**
   * Delete country
   *
   * @param id Id of country to delete
   */
  @DELETE('/countries/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public deleteCountry(@Path('id') id: string): Observable<any> {
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
   * Create location
   *
   * @param form form containing data of location
   */
  @POST('/locations')
  public createLocation(@Body form: LocationCreateForm): Observable<any> {
    return null;
  }

  /**
   * Update location
   *
   * @param form form containing data of location
   */
  @PUT('/locations/{id}')
  public updateLocation(@Path('id') id: string, @Body form: LocationUpdateForm): Observable<any> {
    return null;
  }

  /**
   * Delete location
   *
   * @param id Id of location to delete
   */
  @DELETE('/locations/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public deleteLocation(@Path('id') id: string): Observable<any> {
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
   * Fetch state
   *
   * @param id Id of state to fetch
   */
  @GET('/states/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public fetchState(@Path('id') id: string): Observable<any> {
    return null;
  }
  
  /**
   * Create state
   *
   * @param form form containing data of state
   */
  @POST('/states')
  public createState(@Body form: StateCreateForm): Observable<any> {
    return null;
  }

  /**
   * Update state
   *
   * @param form form containing data of state
   */
  @PUT('/states/{id}')
  public updateState(@Path('id') id: string, @Body form: StateUpdateForm): Observable<any> {
    return null;
  }

  /**
   * Delete state
   *
   * @param id Id of state to Delete
   */
  @DELETE('/states/{id}')
  @Adapter(LocationAdapter.locationAdapter)
  public deleteState(@Path('id') id: string): Observable<any> {
    return null;
  }
}
