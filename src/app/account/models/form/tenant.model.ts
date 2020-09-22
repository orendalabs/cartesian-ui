export enum TenantAvailabilityState {
  _1 = 1,
  _2 = 2,
  _3 = 3,
}

export class AppTenantAvailabilityState {
  static Available: number = TenantAvailabilityState._1;
  static InActive: number = TenantAvailabilityState._2;
  static NotFound: number = TenantAvailabilityState._3;
}

export interface IIsTenantAvailableForm {
  name: string | undefined;
}

export interface IIsTenantAvailableResponse {
  state: TenantAvailabilityState;
  tenantId: string | undefined;
}

export class IsTenantAvailableForm implements IIsTenantAvailableForm {
  name: string | undefined;

  constructor(data?: IIsTenantAvailableForm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data["name"];
    }
  }

  static fromJS(data: any): IsTenantAvailableForm {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableForm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    return data;
  }

  clone(): IsTenantAvailableForm {
    const json = this.toJSON();
    let result = new IsTenantAvailableForm();
    result.init(json);
    return result;
  }
}

export class IsTenantAvailableResponse implements IIsTenantAvailableResponse {
  state: TenantAvailabilityState;
  tenantId: string | undefined;

  constructor(data?: IIsTenantAvailableResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.state = data["state"];
      this.tenantId = data["tenantId"];
    }
  }

  static fromJS(data: any): IsTenantAvailableResponse {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["state"] = this.state;
    data["tenantId"] = this.tenantId;
    return data;
  }

  clone(): IsTenantAvailableResponse {
    const json = this.toJSON();
    let result = new IsTenantAvailableResponse();
    result.init(json);
    return result;
  }
}
