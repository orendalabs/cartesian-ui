export interface ILocationCreateForm {
  locatableType: string;
  locatableId: string;
  addressLine1: string;
  addressLine2: string;
  countryId: string;
  stateId: string;
  cityId: string;
  postCode: string;
  latitude: string;
  longitude: string;
}

export class LocationCreateForm implements ILocationCreateForm {
  public locatableType: string;
  public locatableId: string;
  public addressLine1: string;
  public addressLine2: string;
  public countryId: string;
  public stateId: string;
  public cityId: string;
  public postCode: string;
  public latitude: string;
  public longitude: string;

  constructor(data?: ILocationCreateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): LocationCreateForm {
    data = typeof data === 'object' ? data : {};
    const result = new LocationCreateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.locatableId = data ? data.locatable_id : '';
      this.locatableType = data ? data.locatable_type : '';
      this.addressLine1 = data ? data.address_line_1 : '';
      this.addressLine2 = data ? data.address_line_2 : '';
      this.postCode = data ? data.post_code : '';
      this.latitude = data ? data.latitude : '';
      this.longitude = data ? data.longitude : '';
      this.countryId = data ? data.country_id : '';
      this.cityId = data ? data.city_id : '';
      this.stateId = data ? data.state_id : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.locatable_id = this.locatableId;
    data.locatable_type = this.locatableType;
    data.address_line_1 = this.addressLine1;
    data.address_line_2 = this.addressLine2;
    data.post_code = this.postCode;
    data.latitude = this.latitude;
    data.longitude = this.longitude;
    data.country_id = this.countryId;
    data.city_id = this.cityId;
    data.state_id = this.stateId;

    return data;
  }

  clone(): LocationCreateForm {
    const json = this.toJSON();
    const result = new LocationCreateForm();
    result.init(json);
    return result;
  }
}
