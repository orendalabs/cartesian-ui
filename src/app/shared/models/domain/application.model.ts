import * as moment from "@node_modules/moment";

export interface IApplication {
  version: string | undefined;
  releaseDate: moment.Moment | undefined;
  features: { [key: string]: boolean; } | undefined;
}


export class Application implements IApplication {
  version: string | undefined;
  releaseDate: moment.Moment;
  features: { [key: string]: boolean; } | undefined;

  constructor(data?: IApplication) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.version = data["version"];
      this.releaseDate = data["releaseDate"] ? moment(data["releaseDate"].toString()) : <any>undefined;
      if (data["features"]) {
        this.features = {} as any;
        for (let key in data["features"]) {
          if (data["features"].hasOwnProperty(key))
            this.features[key] = data["features"][key];
        }
      }
    }
  }

  static fromJS(data: any): Application {
    data = typeof data === 'object' ? data : {};
    let result = new Application();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["version"] = this.version;
    data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : <any>undefined;
    if (this.features) {
      data["features"] = {};
      for (let key in this.features) {
        if (this.features.hasOwnProperty(key))
          data["features"][key] = this.features[key];
      }
    }
    return data;
  }

  clone(): Application {
    const json = this.toJSON();
    let result = new Application();
    result.init(json);
    return result;
  }
}
