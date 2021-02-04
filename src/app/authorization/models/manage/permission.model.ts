export class ManagePermissionForm {
  roleId: string;
  permissionsIds: string[];

  constructor(permissionForm?: ManagePermissionForm) {
    if (permissionForm) {
      this.roleId = permissionForm.roleId;
      this.permissionsIds = permissionForm.permissionsIds;
    }
  }
}
