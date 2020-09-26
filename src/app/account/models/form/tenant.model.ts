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
  constructor(data?: IIsTenantAvailableForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  name: string | undefined;

  static fromJS(data: any): IsTenantAvailableForm {
    data = typeof data === 'object' ? data : {};
    const result = new IsTenantAvailableForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.name = data.name;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.name = this.name;
    return data;
  }

  clone(): IsTenantAvailableForm {
    const json = this.toJSON();
    const result = new IsTenantAvailableForm();
    result.init(json);
    return result;
  }
}

export class IsTenantAvailableResponse implements IIsTenantAvailableResponse {
  constructor(data?: IIsTenantAvailableResponse) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  state: TenantAvailabilityState;
  tenantId: string | undefined;

  static fromJS(data: any): IsTenantAvailableResponse {
    data = typeof data === 'object' ? data : {};
    const result = new IsTenantAvailableResponse();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.state = data.state;
      this.tenantId = data.tenantId;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.state = this.state;
    data.tenantId = this.tenantId;
    return data;
  }

  clone(): IsTenantAvailableResponse {
    const json = this.toJSON();
    const result = new IsTenantAvailableResponse();
    result.init(json);
    return result;
  }
}
