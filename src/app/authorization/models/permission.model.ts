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

  /**
   * 
   * @param permId ID of the permission to find
   * @param perms List of permissions to look in
   * @returns Permission object matching the given ID
   */
  static getPermissionById = (permId: string, perms: Permission[]): Permission => {
    let perm: Permission;
    perms.every((p: Permission) => {
      if (p.id == permId) {
        perm = p;
        return false;
      }
      return true;
    });
    return perm;
  };

  /**
   * 
   * @param permName Name of the permission to find
   * @param perms List of permissions to look in
   * @returns Permission object matching the given name
   */
  static getPermissionByName = (permName: string, perms: Permission[]): Permission => {
    let perm: Permission;
    perms.every((p: Permission) => {
      if (p.name == permName) {
        perm = p;
        return false;
      }
      return true;
    });
    return perm;
  };
}
