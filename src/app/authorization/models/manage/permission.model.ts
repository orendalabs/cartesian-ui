export class ManagePermissionForm {
  roleId: string;
  permissionsIds: string[];

  constructor(permissionForm?: ManagePermissionForm) {
    if (permissionForm) {
      this.roleId = permissionForm.roleId;
      this.permissionsIds = permissionForm.permissionsIds;
    }
  }

  static toJSON(form: ManagePermissionForm) {
    return {
      role_id: form.roleId,
      permissions_ids: form.permissionsIds
    }
  }
}
