import { ValidatorFn, AbstractControl } from '@angular/forms';

export function spanishIbanValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let validationErrorObject = {
      'spanishIban': true
    };

    const value = control.value;
    if (value && value[0] === 'E' && value[1] === 'S') {
        validationErrorObject = null;
    }

    return validationErrorObject;
  };
}

