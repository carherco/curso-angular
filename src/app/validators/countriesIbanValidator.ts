import { ValidatorFn, AbstractControl } from '@angular/forms';

type validationIban = { countriesIban: { currentCountry: any; validCountries: string[]; }; } | null;

export function countriesIbanValidator(validCountries: string[]): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {

    const value = control.value;
    const country = control.value.substring(0, 2);

    let validationErrorObject: validationIban = {
      countriesIban: {
        currentCountry: country,
        validCountries: validCountries
      }
    };

    if (value && validCountries.includes(country)) {
      validationErrorObject = null;
    }

    return validationErrorObject;
  };
}

