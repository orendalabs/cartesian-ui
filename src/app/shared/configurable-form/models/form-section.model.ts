import { IFormField } from './form-field.model';

export interface IFormSection {
  name?: string;
  title?: string;
  subTitle?: string;
  class?: string;
  fields?: IFormField[];
}

