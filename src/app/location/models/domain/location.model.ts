import { IState, ICountry, ICity } from './index';

export interface ILocation {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  realId: string;
  country: { data: ICountry };
  state: { data: IState };
  city: { data: ICity };
}

export class Location implements ILocation {
  public id: string;
  public name: string;
  public addressLine1: string;
  public addressLine2: string;
  public postCode: string;
  public latitude: string;
  public longitude: string;
  public createdAt: string;
  public updatedAt: string;
  public realId: string;
  public country: { data: ICountry };
  public state: { data: IState };
  public city: { data: ICity };

  constructor(data?: ILocation) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): Location {
    data = typeof data === 'object' ? data : {};
    const result = new Location();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.addressLine1 = data ? data.address_line_1 : '';
      this.addressLine2 = data ? data.address_line_2 : '';
      this.postCode = data ? data.post_code : '';
      this.latitude = data ? data.latitude : '';
      this.longitude = data ? data.longitude : '';
      this.createdAt = data ? data.created_at : '';
      this.updatedAt = data ? data.updated_at : '';
      this.realId = data ? data.real_id : '';
      this.country = data ? data.country : '';
      this.state = data ? data.state : '';
      this.city = data ? data.city : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.address_line_1 = this.addressLine1;
    data.address_line_2 = this.addressLine2;
    data.post_code = this.postCode;
    data.latitude = this.latitude;
    data.longitude = this.longitude;
    data.created_at = this.createdAt;
    data.updated_at = this.updatedAt;
    data.real_id = this.realId;
    data.country = this.country;
    data.state = this.state;
    data.city = this.city;

    return data;
  }

  clone(): Location {
    const json = this.toJSON();
    const result = new Location();
    result.init(json);
    return result;
  }
}
