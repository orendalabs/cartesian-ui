export interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export class LoginForm {
  public email: string;
  public password: string;
  public remember: boolean;

  constructor(loginForm?: ILoginForm) {
    this.email = loginForm ? loginForm.email : '';
    this.password = loginForm ? loginForm.password : '';
    this.remember = loginForm ? loginForm.remember : false;
  }
}
