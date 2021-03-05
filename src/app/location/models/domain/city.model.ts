export interface ICity {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

export class City implements ICity {
  public id: string;
  public name: string;
  public latitude: string;
  public longitude: string;

  constructor(data?: ICity) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): City {
    data = typeof data === 'object' ? data : {};
    const result = new City();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.latitude = data ? data.latitude : '';
      this.longitude = data ? data.longitude : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.latitude = this.latitude;
    data.longitude = this.longitude;

    return data;
  }

  clone(): City {
    const json = this.toJSON();
    const result = new City();
    result.init(json);
    return result;
  }
}
