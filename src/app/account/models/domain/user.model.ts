export interface IUser {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  birth: string | undefined;
  confirmed: boolean | undefined;
  email: string | undefined;
  gender: string | undefined;
  logged: boolean | undefined;
}

export class User implements IUser {

  public id: string;
  public name: string;
  public nickname: string;
  public birth: string;
  public confirmed: boolean;
  public email: string;
  public gender: string;
  public logged: boolean;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.id         = data ? data.id : '';
      this.name       = data ? data.name : '';
      this.nickname   = data ? data.nickname : '';
      this.birth      = data ? data.birth : '';
      this.confirmed  = data ? data.confirmed : '';
      this.gender     = data ? data.gender : '';
      this.email      = data ? data.email : '';
      this.logged     = (data && this.email) ? true : false;
    }
  }

  static fromJS(data: any): User {
    data = typeof data === 'object' ? data : {};
    let result = new User();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"]        = this.id;
    data["name"]      = this.name;
    data["nickname"]  = this.nickname;
    data["birth"]     = this.birth;
    data["confirmed"] = this.confirmed;
    data["gender"]    = this.gender;
    data["email"]     = this.email;
    data["logged"]    = this.logged;

    return data;
  }

  clone(): User {
    const json = this.toJSON();
    let result = new User();
    result.init(json);
    return result;
  }

}
