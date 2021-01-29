export class Permission {
    id: string;
    name: string;
    description: string;
    display_name: string;

    constructor(role?: Permission) {
        if (role) {
            this.id = role.id;
            this.name = role.name;
            this.description = role.description;
            this.display_name = role.display_name;
        }
    }
}