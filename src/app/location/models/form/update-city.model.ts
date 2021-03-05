export interface ICityUpdateForm {
  countryId: string;
  stateId: string;
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

export class CityUpdateForm implements ICityUpdateForm {
  public countryId: string;
  public stateId: string;
  public id: string;
  public name: string;
  public latitude: string;
  public longitude: string;

  constructor(data?: ICityUpdateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): CityUpdateForm {
    data = typeof data === 'object' ? data : {};
    const result = new CityUpdateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.countryId = data ? data.country_id : '';
      this.stateId = data ? data.state_id : '';
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.latitude = data ? data.latitude : '';
      this.longitude = data ? data.longitude : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.country_id = this.countryId;
    data.state_id = this.stateId;
    data.id = this.id;
    data.name = this.name;
    data.latitude = this.latitude;
    data.longitude = this.longitude;

    return data;
  }

  clone(): CityUpdateForm {
    const json = this.toJSON();
    const result = new CityUpdateForm();
    result.init(json);
    return result;
  }
}
