export class ManagePermissionForm {
    role_id: string;
    permissions_ids: string[];

    constructor(permissionForm?: ManagePermissionForm) {
        if (permissionForm) {
            this.role_id = permissionForm.role_id;
            this.permissions_ids = permissionForm.permissions_ids;
        }
    }
}