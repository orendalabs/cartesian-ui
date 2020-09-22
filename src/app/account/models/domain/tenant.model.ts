export interface ITenant {
  id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
  isActive: boolean | undefined;
}

export class Tenant implements ITenant {
  id: string | undefined;
  name: string | undefined;
  slug: string | undefined;
  isActive: boolean | undefined;


  constructor(data?: ITenant) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.id       = data["id"];
      this.name     = data["name"];
      this.slug     = data["slug"];
      this.isActive = data["isActive"];
    }
  }

  static fromJS(data: any): Tenant {
    data = typeof data === 'object' ? data : {};
    let result = new Tenant();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"]        = this.id;
    data["name"]      = this.name;
    data["slug"]      = this.slug;
    data["isActive"]  = this.isActive;

    return data;
  }

  clone(): Tenant {
    const json = this.toJSON();
    let result = new Tenant();
    result.init(json);
    return result;
  }
}
