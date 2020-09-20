export interface IAuthToken {
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;
}

export class AuthToken implements IAuthToken {
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;

  constructor(data?: IAuthToken) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.tokenType    = data["tokenType"];
      this.accessToken  = data["accessToken"];
      this.refreshToken = data["refreshToken"];
      this.expiresIn    = data["expiresIn"];
    }
  }

  static fromJS(data: any): AuthToken {
    data = typeof data === 'object' ? data : {};
    let result = new AuthToken();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["tokenType"] = this.tokenType;
    data["accessToken"] = this.accessToken;
    data["refreshToken"] = this.refreshToken;
    data["expiresIn"] = this.expiresIn;
    return data;
  }

  clone(): AuthToken {
    const json = this.toJSON();
    let result = new AuthToken();
    result.init(json);
    return result;
  }

  /**
   * Saves token into local storage
   *
   * @param token
   */
  public save(): void {
    localStorage.setItem('authToken', JSON.stringify(this));
  }

  /**
   * Removes token from local storage
   */
  public remove(): void {
    localStorage.setItem('authToken', null);
  }
}
