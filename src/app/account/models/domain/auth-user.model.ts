export interface IAuthUser {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  birth: string | undefined;
  confirmed: boolean | undefined;
  email: string | undefined;
  gender: string | undefined;
  logged: boolean | undefined;
}

export class AuthUser implements IAuthUser {
  constructor(data?: IAuthUser) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  public id: string;
  public name: string;
  public nickname: string;
  public birth: string;
  public confirmed: boolean;
  public email: string;
  public gender: string;
  public logged: boolean;

  static fromJS(data: any): AuthUser {
    data = typeof data === 'object' ? data : {};
    const result = new AuthUser();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.nickname = data ? data.nickname : '';
      this.birth = data ? data.birth : '';
      this.confirmed = data ? data.confirmed : '';
      this.gender = data ? data.gender : '';
      this.email = data ? data.email : '';
      this.logged = data && this.email ? true : false;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.nickname = this.nickname;
    data.birth = this.birth;
    data.confirmed = this.confirmed;
    data.gender = this.gender;
    data.email = this.email;
    data.logged = this.logged;

    return data;
  }

  clone(): AuthUser {
    const json = this.toJSON();
    const result = new AuthUser();
    result.init(json);
    return result;
  }
}
