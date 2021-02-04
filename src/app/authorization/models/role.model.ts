export interface IRole {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
  level: number | undefined;
  permissions: any | undefined;
}

export class Role {
  id: string;
  name: string;
  description: string;
  displayName: string;
  level: number;
  permissions: any;

  constructor(role?: IRole) {
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.description = role.description;
      this.displayName = role.displayName;
      this.level = role.level;
      this.permissions = role.permissions;
    }
  }

  /**
   * 
   * @param roleId Id of the role to find
   * @param roles List of roles to look in
   * @returns Role object matching the given Id
   */
  static getRoleById = (roleId: string, roles: Role[] = []): Role => {
    let role: Role;
    roles.every((r: Role) => {
      if (r.id === roleId) {
        role = r;
        return false;
      }
      return true;
    });
    return role;
  };

  /**
   * 
   * @param roleId Name of the role to find
   * @param roles List of roles to look in
   * @returns Role object matching the given name
   */
  static getRoleByName = (roleName: string, roles: Role[] = []): Role => {
    let role: Role;
    roles.every((r: Role) => {
      if (r.name === roleName) {
        role = r;
        return false;
      }
      return true;
    });
    return role;
  };
}
