export interface ITenantCreateForm {
  name: string;
}

export class TenantCreateForm implements ITenantCreateForm {
  name: string;

  constructor(object: any) {
    if (object) {
      this.name = object.name;
    }
  }
}
