export interface ITenant {
  id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
  isActive: boolean | undefined;
}

export class Tenant implements ITenant {
  constructor(data?: ITenant) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }
  id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
  isActive: boolean | undefined;

  static fromJS(data: any): Tenant {
    data = typeof data === 'object' ? data : {};
    const result = new Tenant();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.slug = data.slug;
      this.isActive = data.isActive;
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.slug = this.slug;
    data.isActive = this.isActive;

    return data;
  }

  clone(): Tenant {
    const json = this.toJSON();
    const result = new Tenant();
    result.init(json);
    return result;
  }
}
