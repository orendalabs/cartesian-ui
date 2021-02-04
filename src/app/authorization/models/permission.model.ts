export interface IPermission {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
}

export class Permission implements IPermission {
  public id: string;
  public name: string;
  public description: string;
  public displayName: string;

  constructor(permission?: IPermission) {
    if (permission) {
      this.id = permission.id;
      this.name = permission.name;
      this.description = permission.description;
      this.displayName = permission.displayName;
    }
  }
}
