import { Validators, ValidationResult } from '@lemoncode/fonk';
import { ValidatorFn, AbstractControl } from '@angular/forms';

interface RequiredArgs {
  trim: boolean; // Default value equals true
}

function required(customArgs: RequiredArgs): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const fieldValidatorArgs = {value: control.value, customArgs }; // TODO: customArgs es opcional
    const validationResult = Validators.required.validator(fieldValidatorArgs) as ValidationResult;

    let validationErrorObject = null;
    if (!validationResult.succeeded) {
      validationErrorObject = {
        fonkRequired: validationResult
      };
    }

    return validationErrorObject;
  };
}

interface PatternArgs {
  pattern: string | RegExp;
}

function pattern(customArgs: PatternArgs): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const fieldValidatorArgs = {value: control.value, customArgs };
    const validationResult = Validators.pattern.validator(fieldValidatorArgs) as ValidationResult;

    let validationErrorObject = null;
    if (!validationResult.succeeded) {
      validationErrorObject = {
        fonkPattern: validationResult
      };
    }

    return validationErrorObject;
  };
}

interface LengthArgs {
  length: number;
}

function minLength(customArgs: LengthArgs): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const fieldValidatorArgs = {value: control.value, customArgs };
    const validationResult = Validators.minLength.validator(fieldValidatorArgs) as ValidationResult;

    let validationErrorObject = null;
    if (!validationResult.succeeded) {
      validationErrorObject = {
        fonkMinLength: validationResult
      };
    }

    return validationErrorObject;
  };
}

function maxLength(customArgs: LengthArgs): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const fieldValidatorArgs = {value: control.value, customArgs };
    const validationResult = Validators.maxLength.validator(fieldValidatorArgs) as ValidationResult;

    let validationErrorObject = null;
    if (!validationResult.succeeded) {
      validationErrorObject = {
        fonkMaxLength: validationResult
      };
    }

    return validationErrorObject;
  };
}

function email(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const fieldValidatorArgs = {value: control.value};
    const validationResult = Validators.email.validator(fieldValidatorArgs) as ValidationResult;

    let validationErrorObject = null;
    if (!validationResult.succeeded) {
      validationErrorObject = {
        fonkEmail: validationResult
      };
    }

    return validationErrorObject;
  };
}

const index = {
  required: required,
  email: email,
  pattern: pattern,
  minLength: minLength,
  maxLength: maxLength
};

export { index as Validators };
