export interface IAuthToken {
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;
}

export class AuthToken implements IAuthToken {
  constructor(data?: IAuthToken) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;

  static fromJS(data: any): AuthToken {
    data = typeof data === 'object' ? data : {};
    const result = new AuthToken();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.tokenType = data.tokenType;
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      this.expiresIn = data.expiresIn;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.tokenType = this.tokenType;
    data.accessToken = this.accessToken;
    data.refreshToken = this.refreshToken;
    data.expiresIn = this.expiresIn;
    return data;
  }

  clone(): AuthToken {
    const json = this.toJSON();
    const result = new AuthToken();
    result.init(json);
    return result;
  }
}
