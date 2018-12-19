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
