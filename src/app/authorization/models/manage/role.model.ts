export class ManageRoleForm {
  userId: string;
  rolesIds: string[];

  constructor(roleForm?: ManageRoleForm) {
    if (roleForm) {
      this.userId = roleForm.userId;
      this.rolesIds = roleForm.rolesIds;
    }
  }

  static toJSON(form: ManageRoleForm) {
    return {
      user_id: form.userId,
      roles_ids: form.rolesIds
    }
  }
}