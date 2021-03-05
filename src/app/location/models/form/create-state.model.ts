export interface IStateCreateForm {
  countryId: string;
  name: string;
  code: string;
}

export class StateCreateForm implements IStateCreateForm {
  public countryId: string;
  public name: string;
  public code: string;

  constructor(data?: IStateCreateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): StateCreateForm {
    data = typeof data === 'object' ? data : {};
    const result = new StateCreateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.countryId = data ? data.country_id : '';
      this.name = data ? data.name : '';
      this.code = data ? data.code : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.country_id = this.countryId;
    data.name = this.name;
    data.code = this.code;

    return data;
  }

  clone(): StateCreateForm {
    const json = this.toJSON();
    const result = new StateCreateForm();
    result.init(json);
    return result;
  }
}
