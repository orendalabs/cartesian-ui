export interface ITenantUpdateForm {
  name: string;
  status: string;
}

export class TenantUpdateForm implements ITenantUpdateForm {
  name: string;
  status: string;

  constructor(object: any) {
    if (object) {
      this.name = object.name;
      this.status = object.status;
    }
  }
}
