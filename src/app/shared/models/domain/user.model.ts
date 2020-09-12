export interface IUserModel {
  email: string | undefined;
  isLoggedIn: boolean | undefined;
}

export class User implements IUserModel {

  public email:      string;
  public isLoggedIn: boolean;

  constructor(user?: any) {
    this.email      = user ? user.email : '';
    this.isLoggedIn = this.email ? true : false;
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
