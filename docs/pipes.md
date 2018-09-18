# Pipes

Las pipes son como una especie de funciones de transformación de datos. Toman un dato como entrada y lo devuelven transformado.

- Se utilizan en las templates con el operador | 

Ejemplo

Suponiendo que *dateObj* es un objeto de tipo fecha con valor (year: 2017, month: 11, day: 14, hour: 10, minute: 43, second: 11):

```html
    {{ dateObj | date }}               // output is 'Nov 14, 2017'
    {{ dateObj | date:'medium' }}      // output is 'Nov 14, 2017, 10:43:11 AM'
    {{ dateObj | date:'shortTime' }}   // output is '10:43 AM'
    {{ dateObj | date:'mmss' }}        // output is '43:11'
```

- Aceptan cualquier número de parámetros opcionales, separados con :

Ejemplo:

```html
  {{texto | slices:1:5}}
```

- Son concatenables

Ejemplo: 

```html
{{  birthday | date:'fullDate' | uppercase}}
```

## Built-in pipes

- AsyncPipe
- CurrencyPipe
- DatePipe
- DecimalPipe
- I18nPluralPipe
- I18nSelectPipe
- JsonPipe
- Keyvalue
- LowerCasePipe
- PercentPipe
- SlicePipe
- TitleCasePipe
- UpperCasePipe

[Documentación pipe]: (https://angular.io/api?type=pipe)

[Ejemplo de KeyValue ] https://www.angularjswiki.com/angular/angular-keyvalue-pipe-loop-object-key-values-using-ngfor/

## Custom pipes

Es posible programar pipes personalizadas.

Ejemplo:

``` typescript
    import { Pipe, PipeTransform } from '@angular/core';
    /*
    * Raise the value exponentially
    * Takes an exponent argument that defaults to 1.
    * Usage:
    *   value | exponentialStrength:exponent
    * Example:
    *   {{ 2 | exponentialStrength:10 }}
    *   formats to: 1024
    */
    @Pipe({name: 'exponentialStrength'})
    export class ExponentialStrengthPipe implements PipeTransform {
      transform(value: number, exponent: string): number {
        let exp = parseFloat(exponent);
        return Math.pow(value, isNaN(exp) ? 1 : exp);
      }
    }
```

Características:

- Una pipe es una clase decorada con metadata.
- La clase implementa el método *transform" de la interfaz *PipeTransform* que acepta un valor de entrada seguido de parámetros opcionales y devuelve el valor transformado.
- Para informar a Angular de que es una Pipe, se aplica el decorador @Pipe importado la librería *core* de Angular.
- El decorador @Pipe permite definir el nombre de la pipe utilizado en las templates. Debe ser por tanto un identificador válido de JavaScript.
- Se debe incluir la pipe en el array de *declarations* del *AppModule*.

## Pipes puras e impuras

Las pipes puras detectan cambios en las variables pero no detectan cambios dentro de arrays u otros objetos compuestos.

Las pipes impuras inspeccionan todo el contenido del array o de los objetos.

Para crear una pipe impura hay que indicar en los metadatos del decorador *pure:false*
```typescript
@Pipe({
  name: 'exponentialStrength',
  pure: false
})
```


[Índice](index.md)
