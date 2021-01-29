export class ManageRoleForm {
    user_id: string;
    roles_ids: string[];

    constructor(roleForm?: ManageRoleForm) {
        if (roleForm) {
            this.user_id = roleForm.user_id;
            this.roles_ids = roleForm.roles_ids;
        }
    }
}