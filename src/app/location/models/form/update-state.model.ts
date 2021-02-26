export interface IStateUpdateForm {
  id: string;
  countryId: string;
  name: string;
  code: string;
}

export class StateUpdateForm implements IStateUpdateForm {
  public id: string;
  public countryId: string;
  public name: string;
  public code: string;

  constructor(data?: IStateUpdateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): StateUpdateForm {
    data = typeof data === 'object' ? data : {};
    const result = new StateUpdateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.countryId = data ? data.country_id : '';
      this.name = data ? data.name : '';
      this.code = data ? data.code : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.country_id = this.countryId;
    data.name = this.name;
    data.code = this.code;

    return data;
  }

  clone(): StateUpdateForm {
    const json = this.toJSON();
    const result = new StateUpdateForm();
    result.init(json);
    return result;
  }
}