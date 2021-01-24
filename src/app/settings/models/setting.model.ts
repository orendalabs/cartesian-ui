export class Setting {
    public key: string;
    public value: string;

    constructor(object?) {
        if (object) {
            this.key = object.key;
            this.value = object.value;
        }
    }
}