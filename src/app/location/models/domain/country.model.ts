export interface ICountry {
  id: string;
  name: string;
  code: string;
  native: string;
  alpha2: string;
  alpha3: string;
  isd: string;
  capital: string;
  currency: string;
  continent: string;
  subcontinent: string;
  emoji: string;
  emojiUnicode: string;
}

export class Country implements ICountry {
  public id: string;
  public name: string;
  public code: string;
  public native: string;
  public alpha2: string;
  public alpha3: string;
  public isd: string;
  public capital: string;
  public currency: string;
  public continent: string;
  public subcontinent: string;
  public emoji: string;
  public emojiUnicode: string;

  constructor(data?: ICountry) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): Country {
    data = typeof data === 'object' ? data : {};
    const result = new Country();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.id = data ? data.id : '';
      this.name = data ? data.name : '';
      this.code = data ? data.code : '';
      this.native = data ? data.native : '';
      this.alpha2 = data ? data.alpha2 : '';
      this.alpha3 = data ? data.alpha3 : '';
      this.isd = data ? data.isd : '';
      this.capital = data ? data.capital : '';
      this.currency = data ? data.currency : '';
      this.continent = data ? data.continent : '';
      this.subcontinent = data ? data.subcontinent : '';
      this.emoji = data ? data.emoji : '';
      this.emojiUnicode = data ? data.emoji_unicode : '';
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data.id = this.id;
    data.name = this.name;
    data.code = this.code;
    data.native = this.native;
    data.alpha2 = this.alpha2;
    data.alpha3 = this.alpha3;
    data.isd = this.isd;
    data.capital = this.capital;
    data.currency = this.currency;
    data.continent = this.continent;
    data.subcontinent = this.subcontinent;
    data.emoji = this.emoji;
    data.emoji_unicode = this.emojiUnicode;

    return data;
  }

  clone(): Country {
    const json = this.toJSON();
    const result = new Country();
    result.init(json);
    return result;
  }
}
