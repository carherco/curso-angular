# Custom validators

Un custom validator tiene el siguiente aspecto:

```typescript
// validators/forbidden-name.ts
/** A user's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
```

Se trata de una función factoría. Es decir, una función (forbiddenNameValidator) que construye otra función de tipo ValidatorFn.

La función ValidatorFn tiene que devolver un null (si todo ha ido bien) o un {[key: string]: any} (si ha habido algún error).

Así que la misión de nuestra función es **hacer un return de una función que devuelva un *null* si todo ha ido bien o un objeto {`key': value} si ha habido algún error**.

En este ejemplo, a la función *forbiddenNameValidator* le llega una expresión regular. La función construida hace uso de la expresión regular para devolver o bien un null o bien el objeto {'forbiddenName': {value: control.value}}.

## Cómo utilizarlos en formularios reactivos

```typescript
this.heroForm = new FormGroup({
  'name': new FormControl(this.hero.name, [
    Validators.required,
    Validators.minLength(4),
    forbiddenNameValidator(/bob/i)
  ]),
  'alterEgo': new FormControl(this.hero.alterEgo),
  'power': new FormControl(this.hero.power, Validators.required)
});
```

## Cómo utilizarlos en formularios temaplate driven

En los template forms no tenemos acceso directo a la instancia del FormControl. Lo que tenemos que hacer es construirnos una directiva para poder utilizarla en la plantilla.

Esta directiva será en realidad un *wrapper* de la función validadora.

Para que angular reconozca la directiva como un validador, dicha directiva se tiene que registrar a sí misma con el provider **NG_VALIDATORS**.

```typescript
providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
```

Para programar la directiva tenemos que implementar el inferfaz Validator, que nos obliga a implementar una función **validate**.

```typescript
@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenName: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}
```

Una vez programada la directiva, simplemente tenemos que aplicarla en los controles que queramos que cumplan con la validación.

```html
<input id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="user.name" #name="ngModel" >
```

## Custom async validators

Los custom async validators son iguales que los sync validators excepto en que tienen que devolver **una Promesa o un Observable** que emitan/resuelvan o bien un null o bien un objeto de error de validación. En caso de observables, el observable tiene que emitir la señal de finalizado. En ese momento, el formulario utiliza para la validación el último valor emitido.

## Ejemplo: Validador de IBAN español

Vamos a crear un validador que compruebe si un determinado IBAN bancario es español.

1) Un validador es una función...

```ts
export function spanishIbanValidator() {
  
}
```

2) Un validador es una función factoría (una función que hace un return de una función)...

```ts
export function spanishIbanValidator() {
  return () => {};
}
```

3) La función que tiene que devolver nuestra factoría es una función de tipo ValidatorFn...

```ts
import { ValidatorFn } from '@angular/forms';

export function spanishIbanValidator(): ValidatorFn {
  return () => {};
}
```

Solamente queda programar la función del return, que ahora está vacía 

```ts
return () => {}
```

para que sea una función de tipo ValidatorFn, y que además, realice la validación que queremos.

4) Para mayor claridad, vamos a crear esta segunda función fuera de la factoría y guardarla en una variable temporal llamada myValidatorFn y nos centramos en ella.

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn = () => {};

export function spanishIbanValidator(): ValidatorFn {
  return myValidatorFn;
}
```

5) La variable myValidatorFn debe ser de tipo ValidatorFn

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn: ValidatorFn = () => {};

...
```

6) El tipo ValidatorFn es una función que recibe como argumento un AbstractControl...

```ts
import { ValidatorFn, AbstractControl} from '@angular/forms';

myValidatorFn: ValidatorFn = (control: AbstractControl) => {};

...
```

y tiene que devolver un *null* si todo ha ido bien o un objeto *{'key': value}* si ha habido algún error. Siendo *key* de tipo string y siendo *value* cualquier cosa (un string, un número, un boolean, un objeto...). Por lo que el tipado del código anterior y el tipado del siguiente código son el mismo:

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn: {[key: string]: any} | null = (control: AbstractControl) => {};

...
```

7) Empezemos a programar la función. Como primer paso, creamos y devolvemos el objeto de error de validación que se debe devolver si no se ha pasado la validación:

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn: {[key: string]: any} | null = (control: AbstractControl) => {
  let validationErrorObject = {
    spanishIban: true
  };

  return validationErrorObject;
};

...
```

Ese objeto es del tipo {[key: string]: any}, es decir, una clave de tipo string, y un valor para esa clave que puede ser cualquier cosa.

8) Como segundo paso, añadimos el código necesario para que se devuelva *null* en caso de que la validación haya sido exitosa. Recordemos que como argumento de entrada nos llega el control, del cual podemos coger el value

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn: {[key: string]: any} | null = (control: AbstractControl) => {
  let validationErrorObject = {
    spanishIban: true
  };

  const value = control.value;
  if (value && value[0] === 'E' && value[1] === 'S') {
      let validationErrorObject = null;
  }

  return validationErrorObject;
};

...
```

Y ya está. La función devolverá null si el IBAN es español, y devolverá el objeto de error de validación si el IBAN no es español.

El código completo nos quedará así:

```ts
import { ValidatorFn } from '@angular/forms';

myValidatorFn: {[key: string]: any} | null = (control: AbstractControl) => {
  let validationErrorObject = {
    spanishIban: true
  };

  const value = control.value;
  if (value && value[0] === 'E' && value[1] === 'S') {
      let validationErrorObject = null;
  }

  return validationErrorObject;
};

export function spanishIbanValidator(): ValidatorFn {
  return myValidatorFn;
}
```

Y podemos meter el código de myValidatorFn dentro de la factoría:

```ts
import { ValidatorFn } from '@angular/forms';

export function spanishIbanValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let validationErrorObject = {
      spanishIban: true
    };

    const value = control.value;
    if (value && value[0] === 'E' && value[1] === 'S') {
        let validationErrorObject = null;
    }

    return validationErrorObject;
  };
}
```

Nuestro validador está listo para utilizarse en formularios reactivos:

```typescript
this.userForm = new FormGroup({
  name: new FormControl(this.user.name, [Validators.required]),
  iban: new FormControl(this.user.iban, [Validators.required, spanishIbanValidator()])
});
```

## Ejemplo: Validador de IBAN genérico

En este ejemplo, vamos a generalizar el validador de IBAN español, para poder configurarlo para que dé por válidos cuentas IBAN de los países que queramos.

1) Partimos del mismo código anterior, pero cambiamos el nombre del validador de spanishIbanValidator() a countriesIbanValidator(). Y la clave del objeto de validación de error la cambiamos de spanishIban a iban a secas o a countriesIban.

```ts
import { ValidatorFn } from '@angular/forms';

export function countriesIbanValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let validationErrorObject = {
      countriesIban: true
    };

    const value = control.value;
    if (value && value[0] === 'E' && value[1] === 'S') {
        let validationErrorObject = null;
    }

    return validationErrorObject;
  };
}
```

2) Necesitaremos un argumento de entrada en countriesIbanValidator() para indicar los países que queremos que sean válidos:

```ts
// ...
export function countriesIbanValidator(validCountries: string[]): ValidatorFn {
// ...
```

El argumento de entrada será un array de esta forma:

```ts
validCountries = ['ES', 'FR'];
```

3) Adaptamos la función que realiza la validación para que compruebe cualquiera de los países que vengan en el array

```ts
import { ValidatorFn } from '@angular/forms';

export function countriesIbanValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const value = control.value;
    const country = control.value.substring(0, 2);

    let validationErrorObject = {
      countriesIban: true
    };

    if (value && validCountries.includes(country)) {
      validationErrorObject = null;
    }

    return validationErrorObject;
  };
}
```

4) Y por último, no es obligatorio, pero podemos mejorar el objeto de error de validación para dar más información de lo que está pasando.

```ts
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function countriesIbanValidator(validCountries: string[]): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {

    const value = control.value;
    const country = control.value.substring(0, 2);

    let validationErrorObject = {
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
```

Nuestro validador ya está listo para utilizarse en formularios reactivos:

```typescript
this.userForm = new FormGroup({
  name: new FormControl(this.user.name, [Validators.required]),
  iban: new FormControl(this.user.iban, [Validators.required, countriesIbanValidator(['ES', 'FR'])])
});
```

- Código de los ejemplos resueltos en el componente iban-validator-example

- Demo en: http://carherco.es/curso-angular/#/iban-validator
