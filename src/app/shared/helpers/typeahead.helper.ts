import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { FormHelper } from "./form.helper";

export class TypeaheadHelper {
  typeaheadData: string[] = [];
  control: FormControl;
}

export class TypeaheadItemListHelper<ItemType> extends TypeaheadHelper {

  items: ItemType[] = [];
  addedItems: ItemType[] = [];
  private validationPropertyName: string = 'name';

  /**
   * 
   * @param validationPropertyName Name of the property used for data validation. Defaults to `name`.
   */
  constructor(validationPropertyName = "name") {
    super();
    this.validationPropertyName = validationPropertyName;
  }

  /**
   * 
   * @param item Item to add to list
   */
  addItem(item: ItemType) {
    if (this.control.valid) {
      this.addedItems.push(item);
      this.control.reset();
      this.resetValidators();
    }
  }

  /**
   * 
   * @param item Item to remove from list
   */
  removeItem(index: number) {
    this.addedItems.splice(index, 1);
  }

  /**
   * Resets validators on the `control` property
   * @param validators Array of custom validators
   */
  resetValidators(validators?: ValidatorFn[]) {
    const v = validators ? validators : [
      Validators.required,
      FormHelper.inValidator(this.typeaheadData),
      FormHelper.notInValidator(this.addedItems.map((item) => item[this.validationPropertyName])),
    ]
    this.control.setValidators(v);
  }
}