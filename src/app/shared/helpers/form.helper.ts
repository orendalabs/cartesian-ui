import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export class FormHelper {

    // Validators

    /**
     * Validates email based on the RegEx ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$
     */
    static emailValidator(): ValidatorFn {
        const regEx = new RegExp(String.raw`^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$`)
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = regEx.test(control.value);
            return valid ? null : { email: { value: "Invalid email pattern!" } };
        };
    }

    /**
     * Validates gender. Accepts Male and Female (case sensitive).
     */
    static genderValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = control.value == 'Male' || control.value == 'Female';
            return valid ? null : { gender: { value: "Gender must be either male or female!" } };
        };
    }

    /**
     * Verifies that the date is in correct format.
     */
    static dateFormatValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = Date.parse(control.value);
            return valid ? null : { date: { value: "The date entered is invalid!" } };
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
            return valid ? null : { dob: { value: "You need to be at least 12 years old." } };
        };
    }

    /**
     * 
     * @param values Array of values to look in
     * @returns true if control value is in the given array, false otherwise
     */
    static inValidator(values: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            for(let i = 0;i < values.length; i++) {
                if (values[i] == control.value) {
                    return null;
                }
            }
            return { value: { value: "Invalid value." } };
        };
    }

    /**
     * 
     * @param values Array of values to look in
     * @returns true if control value is in the given array, false otherwise
     */
    static notInValidator(values: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            for(let i = 0;i < values.length; i++) {
                if (values[i] != control.value) {
                    return null;
                }
            }
            return { value: { value: "Invalid value." } };
        };
    }

    // Helpers
    /**
     * 
     * @param e Element of type AbstractControl to test for validity.
     * @returns String with classes for invalid, valid or default form.
     */
    static getFormClasses = (e: AbstractControl): string => {
        if (e.touched && e.dirty && e.invalid) {
            return 'form-control form-danger'
        }
        if (e.valid) {
            return 'form-control form-success'
        }
        return 'form-control'
    }

    /**
     * 
     * @param e Element with the objects containing errors.
     * @returns Error message as string.
     */

    static getErrorMessage(e: any): string {
        const key = Object.keys(e)[0]
        if (key == 'required') {
            return "This field is required!";
        }
        else if (key == 'minlength') {
            return "This field requires at least " + e[key].requiredLength + " characters."
        }
        else if (key == 'maxlength') {
            return "This field can't have more than " + e[key].requiredLength + " characters."
        }
        else {
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
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}