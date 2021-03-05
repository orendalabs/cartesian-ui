export interface ICountryCreateForm {
  name: string;
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

export class CountryCreateForm implements ICountryCreateForm {
  public name: string;
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

  constructor(data?: ICountryCreateForm) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (this as any)[property] = (data as any)[property];
        }
      }
    }
  }

  static fromJSON(data: any): CountryCreateForm {
    data = typeof data === 'object' ? data : {};
    const result = new CountryCreateForm();
    result.init(data);
    return result;
  }

  init(data?: any) {
    if (data) {
      this.name = data ? data.name : '';
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
    data.name = this.name;
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

  clone(): CountryCreateForm {
    const json = this.toJSON();
    const result = new CountryCreateForm();
    result.init(json);
    return result;
  }
}
