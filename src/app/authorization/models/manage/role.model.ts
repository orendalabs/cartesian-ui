export class ManageRoleForm {
  userId: string;
  rolesIds: string[];

  constructor(roleForm?: ManageRoleForm) {
    if (roleForm) {
      this.userId = roleForm.userId;
      this.rolesIds = roleForm.rolesIds;
    }
  }
}
