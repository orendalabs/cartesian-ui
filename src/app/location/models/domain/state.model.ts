export interface IState {
  id: string;
  name: string;
  code: string;
}

export class State implements IState {
  public id: string;
  public name: string;
  public code: string;

  constructor(data?: IState) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): State {
    data = typeof data === 'object' ? data : {};
    const result = new State();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.code = data ? data.code : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.code = this.code;

    return data;
  }

  clone(): State {
    const json = this.toJSON();
    const result = new State();
    result.init(json);
    return result;
  }
}