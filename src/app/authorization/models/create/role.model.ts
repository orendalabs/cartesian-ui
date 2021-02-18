export class CreateRoleForm {
  name: string;
  description: string;
  displayName: string;

  constructor(form: CreateRoleForm) {
    this.name = form.name;
    this.description = form.description;
    this.displayName = form.displayName;
  }

  static toJSON(form) {
    return {
      name: form.name,
      description: form.description,
      display_name: form.displayName,
    }
  }
}
