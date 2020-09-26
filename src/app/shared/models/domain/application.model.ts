import * as moment from '@node_modules/moment';

export interface IApplication {
  version: string | undefined;
  releaseDate: moment.Moment | undefined;
  features: { [key: string]: boolean } | undefined;
}

export class Application implements IApplication {
  constructor(data?: IApplication) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  version: string | undefined;
  releaseDate: moment.Moment;
  features: { [key: string]: boolean } | undefined;

  static fromJS(data: any): Application {
    data = typeof data === 'object' ? data : {};
    const result = new Application();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.version = data.version;
      this.releaseDate = data.releaseDate
        ? moment(data.releaseDate.toString())
        : (undefined as any);
      if (data.features) {
        this.features = {} as any;
        for (const key in data.features) {
          if (data.features.hasOwnProperty(key)) {
            this.features[key] = data.features[key];
          }
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.version = this.version;
    data.releaseDate = this.releaseDate
      ? this.releaseDate.toISOString()
      : (undefined as any);
    if (this.features) {
      data.features = {};
      for (const key in this.features) {
        if (this.features.hasOwnProperty(key)) {
          data.features[key] = this.features[key];
        }
      }
    }
    return data;
  }

  clone(): Application {
    const json = this.toJSON();
    const result = new Application();
    result.init(json);
    return result;
  }
}
