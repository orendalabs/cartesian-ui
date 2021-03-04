import { Type } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class FormHelper {
  // Validators

  /**
   * Validates email based on the RegEx ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$
   */
  static emailValidator(): ValidatorFn {
    const regEx = new RegExp(
      String.raw`^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$`
    );
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regEx.test(control.value);
      return valid ? null : { email: { value: 'Invalid email pattern!' } };
    };
  }

  /**
   * Validates gender. Accepts Male and Female (case sensitive).
   */
  static genderValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = control.value === 'Male' || control.value === 'Female';
      return valid
        ? null
        : { gender: { value: 'Gender must be either male or female!' } };
    };
  }

  /**
   * Verifies that the date is in correct format.
   */
  static dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = Date.parse(control.value);
      return valid ? null : { date: { value: 'The date entered is invalid!' } };
    };
  }

  /**
   *
   * @param minAge Minimum age (inclusive)
   */
  static dobValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const age = this.getAge(control.value);
      const valid = age >= minAge;
      return valid
        ? null
        : { dob: { value: 'You need to be at least 12 years old.' } };
    };
  }

  /**
   *
   * @param values Array of values to look in
   * @returns true if control value is in the given array, false otherwise
   */
  static inValidator(values: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = values.indexOf(control.value) !== -1;
      return valid ? null : { value: { value: 'Invalid value.' } };
    };
  }

  /**
   *
   * @param values Array of values to look in
   * @returns true if control value is in the given array, false otherwise
   */
  static notInValidator(values: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = values.indexOf(control.value) === -1;
      return valid ? null : { value: { value: 'Invalid value.' } };
    };
  }

  /**
   *
   * @returns true if control value is a float
   */
  static isFloatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp(
        String.raw`^\d+(\.\d+){0,1}$`
      );
      const valid = regex.test(control.value);
      return valid ? null : { value: { value: 'Data must be a number.' } };
    };
  }

  /**
   * Validates space separated unicodes
   */
  static unicodeValidator(): ValidatorFn {
    const regEx = new RegExp(
      String.raw`^(U\+[A-F1-9]{1,6})+( U\+[A-F1-9]{1,6})*$`
    );
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = regEx.test(control.value);
      return valid ? null : { email: { value: 'Invalid unicode pattern!' } };
    };
  }
   
  // Helpers
  /**
   *
   * @param e Element of type AbstractControl to test for validity.
   * @returns String with classes for invalid, valid or default form.
   */
  static getFormClasses = (control: AbstractControl): string => {
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
    return '';
  };

  /**
   *
   * @param e Element with the objects containing errors.
   * @returns Error message as string.
   */

  static getErrorMessage(e: any): string {
    const key = Object.keys(e)[0];
    if (key === 'required') {
      return 'This field is required!';
    } else if (key === 'minlength') {
      return (
        'This field requires at least ' + e[key].requiredLength + ' characters.'
      );
    } else if (key === 'maxlength') {
      return (
        `This field can't have more than ` +
        e[key].requiredLength +
        `characters.`
      );
    } else {
      return e[key].value;
    }
  }

  // Private helpers
  /**
   *
   * @param dob The date to compare with current date for age.
   * @returns Number representing the age.
   */
  static getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
}
