export class AdminUserCreateForm {
    public email: string;
    public password: string;
    public name: string;

    constructor(object?) {
        if (object) {
            this.email = object.email
            this.password = object.password
            this.name = object.name
        }
    }
}