export class EditUserForm {
  name: string;
  password: string;

  constructor(object?) {
    if (object) {
      this.name = object.name;
      this.password = object.password;
    }
  }
}
