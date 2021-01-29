import { Permission } from "./permission.model";

export class Role {
    id: string;
    name: string;
    description: string;
    display_name: string;
    level: number;
    permissions: any;

    constructor(role?: Role) {
        if (role) {
            this.id = role.id;
            this.name = role.name;
            this.description = role.description;
            this.display_name = role.display_name;
            this.level = role.level;
            this.permissions = role.permissions;
        }
    }

    static getRoleById = (roleId: string, roles: Role[] = []): Role => {
        let role: Role;
        roles.every((r: Role) => {
          if (r.id == roleId) {
            role = r;
            return false;
          }
          return true;
        })
        return role;
      }
}