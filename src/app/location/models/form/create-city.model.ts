export interface ICityCreateForm {
  countryId: string;
  stateId: string;
  name: string;
  latitude: string;
  longitude: string;
}

export class CityCreateForm {
  public countryId: string;
  public stateId: string;
  public name: string;
  public latitude: string;
  public longitude: string;

  constructor(data?: ICityCreateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): CityCreateForm {
    data = typeof data === 'object' ? data : {};
    const result = new CityCreateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.countryId = data ? data.country_id : '';
      this.stateId = data ? data.state_id : '';
      this.name = data ? data.name : '';
      this.latitude = data ? data.latitude : '';
      this.longitude = data ? data.longitude : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.country_id = this.countryId;
    data.state_id = this.stateId;
    data.name = this.name;
    data.latitude = this.latitude;
    data.longitude = this.longitude;

    return data;
  }

  clone(): CityCreateForm {
    const json = this.toJSON();
    const result = new CityCreateForm();
    result.init(json);
    return result;
  }
}
