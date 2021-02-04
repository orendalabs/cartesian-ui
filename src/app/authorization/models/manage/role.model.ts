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

export class ManageRoleFormData {
  user_id: string;
  roles_ids: string[];

  constructor(form?: ManageRoleForm) {
    if (form) {
      this.user_id = form.userId,
      this.roles_ids = form.rolesIds
    }
  }
}