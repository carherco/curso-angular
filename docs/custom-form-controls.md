# Controles de formulario personalizados y reutilizables

## El interfaz ControlValueAccessor

ControlValueAccessor es una especie de *bridge* entre el modelo y la vista.

Todos los elementos de HTML de formulario tiene un ControlValueAccessor asociado.

```
+------------------------------------+----------------------+
|              Accessor              |     Form Element     |
+------------------------------------+----------------------+
| DefaultValueAccessor               | input, textarea      |
| CheckboxControlValueAccessor       | input[type=checkbox] |
| NumberValueAccessor                | input[type=number]   |
| RadioControlValueAccessor          | input[type=radio]    |
| RangeValueAccessor                 | input[type=range]    |
| SelectControlValueAccessor         | select               |
| SelectMultipleControlValueAccessor | select[multiple]     |
```

Si queremos programar un control de formulario personalizado, lo que tenemos que hacer es implementar el interfaz ControlValueAccessor para que la API de formularios sepa como interaccionar con nuestro control.

El interfaz ControlValueAccesor tiene 3 métodos obligatorios y uno opcional:

- writeValue(value: any) {}

Recibe el valor que hay que mostar en la vista.

- registerOnChange(fn: (value: any) => void) {}

Es un Callback para informar a Angular de que ha habido un cambio en el control y hay que actualizar el modelo.

- registerOnTouched(fn: () => void) {}

Callback para informar a la api de si se ha tocado el control (propiedad "touched").

- setDisabledState(isDisabled: boolean) {}

Habilita/deshabilita el control en la vista.

## FormControlDirective

Todas las directivas de formulario llaman a la función setUpCotrol para inicializar la intereacción entre el FormControl y el ControlValueAccessor.

Este es el trozo de código que hay en FormControlDirective y que llama a setUpControl().

```ts
export class FormControlDirective ... {
  ...
  ngOnChanges(changes: SimpleChanges): void {
    if (this._isControlChanged(changes)) {
      setUpControl(this.form, this);
```

Y este es el código de setUpControl

```ts
export function setUpControl(control: FormControl, dir: NgControl) {
  
  // initialize a form control
  dir.valueAccessor.writeValue(control.value);
  
  // setup a listener for changes on the native control
  // and set this value to form control
  dir.valueAccessor.registerOnChange((newValue: any) => {
    control.setValue(newValue, {emitModelToViewChange: false});
  });

  // setup a listener for changes on the Angular formControl
  // and set this value to the native control
  control.registerOnChange((newValue: any, ...) => {
    dir.valueAccessor.writeValue(newValue);
  });
```

## writeValue()

Angular llamará a este método con el nuevo valor del control en estos casos:

- Cuando instanciamos un nuevo FormControl.
- Cuando llamamos a this.control.patchValue/setValue(value)

```html
<input type="text" #input>
```

```ts
export class RequiredTextComponent implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef;
  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }
}
```

## registerOnChange()

Angular llama a esta función pasándonos una función como argumento. 

Cada vez que consideremos que el valor del control ha cambiado, tenemos que ejectuar esa función que nos ha pasado angular, pasándole el nuevo valor del control para que Angular pueda actualizar el modelo.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)">
```

```ts
onChange = (_: any) => { };
registerOnChange(fn: (value: any) => void) {
  this.onChange = fn;
}
```

## registerOnTouched()

Igual que con registerOnChange excepto llamaremos a la función que nos pase Angular cuando consideremos que nuestro control ha sido tocado.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()">
```

```ts
onTouched = () => { };
registerOntouched(fn: () => void) {
  this.onTouched = fn;
}
```

## setDisabledState()

Esta función es opcional. Angular llamará a esta función cuando quiera informarnos de que hay que habilitar o deshabilitar el control. Angular llamará a este método en los siguientes casos:

- Si instanciamos el control con la propiedad disabled a true. FormControl({value: '', disabled: true})
- Cuando se ejecute control.disable() o cuando se ejecute call control.enable() si anteriormente se había ejecutado control.disable() al menos una vez.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()"
  [disabled]="disabled">
```

```ts
setDisabledState(disabled: boolean) {
  this.disabled = disabled;
}
```

## Provide the component as NG_VALUE_ACCESSOR

```ts
@Component({
  ...
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RequiredTextComponent
      //useExisting: forwardRef(() => RequiredTextComponent),
    }
  ],
  ...
})
export class RequiredTextComponent implements ControlValueAccessor {
  //...
}
```

or

```ts
const REQUIRED_TEXT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => RequiredTextComponent),
}
@Component({
  ...
  providers: [
    REQUIRED_TEXT_ACCESSOR
  ],
  ...
})
export class RequiredTextComponent implements ControlValueAccessor {
  //...
}
```

Necesitamos usar *forwardRef* porque justo en el momento de ejecutar esa instrucción, la clase no está definida.

*multi: true* indica que se pueden inyectar varias referencias de NG_VALUE_ACCESSOR en este provider.

## Use it

```html
<form>
  <input type="text" name="one" ngModel />
  <select name="two" name="two" ngModel>...</select>
  <required-text name="three" ngModel></required-text>
</form>
```

## Validator interface

El interface Validator requiere que implementemos el método validate().

```ts
validate(ctrl: AbstractControl) {
  return Validator.required(ctrl);
}
```

Y para utilizarlo tenemos que proveerlo.

```ts
@Component({
  providers: [
    {provide: NG_VALIDATORS, multi: true, useExisting: RequiredText}
  ]
})
export class RequiredText {
  validate(ctrl: AbstractControl) {
    return Validator.required(ctrl);
  }
}
```

## NgControl

Es la superclase de todos los FormControlDirective, NgModel y FormControlName.

```ts
constructor(@Self() public controlDirective: NgControl) {

}
```

La directiva @Self nos asegura que angular inyectara nuestra *control directive* y no otra. Puede pasar porque el programador haya envuelto nuestra directiva dentro de otro control.

En este punto estamos inyectando NgControl, pero NgControl tiene que inyectar ValueAccesor y Validator. Esto provocaría una referencia circular.

La solución es hacer una inyección manual.

```ts
constructor(@Self() public controlDir: NgControl) {
  controlDir.valueAccessor = this;
}
```

Y en el lado del validador

```ts
ngOnInit() {
  const control = this.controlDir.control;
  let validators = control.validator ? [control.validator, Validators.required] :Validators.required;
  control.setValidators(validators);
  control.updateValueAndValidity();
}
```

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()"
  [disabled]="disabled">

<div class="error"
  *ngIf="controlDir && !controlDir.control.valid">
  This field is invalid.
</div>
```

Gracias a: https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83 
y a
https://www.youtube.com/watch?v=CD_t3m2WMM8&index=15&list=PLAw7NFdKKYpGUpg7JJ8-PJNMdlrOnmZtN


## Ejercicio: 
https://alligator.io/angular/custom-form-control/
