export interface IUserModel {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  birth: string | undefined;
  confirmed: boolean | undefined;
  email: string | undefined;
  gender: string | undefined;
  logged: boolean | undefined;
}

export class User implements IUserModel {

  public id: string;
  public name: string;
  public nickname: string;
  public birth: string;
  public confirmed: boolean;
  public email: string;
  public gender: string;
  public logged: boolean;

  constructor(user?: any) {
    this.id         = user ? user.id : '';
    this.name       = user ? user.name : '';
    this.nickname   = user ? user.nickname : '';
    this.birth      = user ? user.birth : '';
    this.confirmed  = user ? user.confirmed : '';
    this.gender     = user ? user.gender : '';
    this.email      = user ? user.email : '';
    this.logged     = (user && this.email) ? true : false;
  }

  /**
   * Saves user into local storage
   *
   * @param user
   */
  public save(): void {
    localStorage.setItem('loggedUser', JSON.stringify(this));
  }

  /**
   * Removes user from local storage
   */
  public remove(): void {
    localStorage.setItem('loggedUser', null);
  }
}
