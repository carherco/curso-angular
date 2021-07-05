# Pipes puras e impuras

Las pipes puras detectan cambios en las variables pero no detectan cambios  de arrays u objetos. Consideran que la función *transform()* es una **función pura** y que estamos siguiendo el patrón **Inmutable**.

Las pipes impuras no consideran los datos Inmutables por lo que **se ejecutan en cada ciclo de detección de cambios**.

Para crear una pipe impura hay que indicar en los metadatos del decorador *pure:false*.

```typescript
@Pipe({
  name: 'exponentialStrength',
  pure: false
})
```

Todas las pipes del core de Angular son puras excepto *AsyncPipe*, *JsonPipe* y *SlicePipe*. 

## Ejemplo

El código del ejemplo se puede probar aquí: https://stackblitz.com/edit/angular-playground-4u6unz?file=app/exp.pipe.ts

Supongamos que programamos una pipe que filtra un array de usuarios para quedarse con los que tienen una edad superior o igual a la indicada.

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'app/model/user';

@Pipe({
  name: 'filterAge'
})
export class FilterAgePipe implements PipeTransform {

  transform(value: User[], minage: number): User[] {
    console.log('método trasnform de la pipe filterAge');
    return value.filter( u => u.age >= minage);
  }

}
```

Utilizamos esa pipe en un compomente

```html
<h2>Pipes impuras</h2>

<p>Base: {{ base }}<button (click)="aumentaBase()">+</button></p>
<p>Exponente: {{ exponente }}<button (click)="aumentaExponente()">+</button></p>
<p>Restultado: {{ base | exp:exponente }}</p>

<p>Otro número: {{ otroNumero }} <button (click)="aumentaOtro()">+</button></p>

{{ dataArray | json }}
<p *ngFor="let person of dataArray | filterAge:18">{{ person.name }}</p>

<p><button (click)="addPerson()">Añadir persona al array</button></p>
```

```ts
export class ImpurePipeComponent implements OnInit {

  base = 4;
  exponente = 2;
  otroNumero = 5;

  dataArray = [
    {id: 1, name: 'Carlos', age: 35},
    {id: 2, name: 'Carmen', age: 17},
    {id: 3, name: 'Carolina', age: 25}
  ]

  constructor() { }

  ngOnInit() {
  }

  aumentaBase() {
    this.base += 1;
  }

  aumentaExponente() {
    this.exponente += 1;
  }

  aumentaOtro() {
    this.otroNumero += 1;
  }

  addPerson() {
    this.dataArray.push({id: 4, name: 'Jose', age: 59});
  }

}
```

La parte del componente involucrada con la pipe es la siguiente

```html
{{ dataArray | json }}
<p *ngFor="let person of dataArray | filterAge:18">{{ person.name }}</p>

<p><button (click)="addPerson()">Añadir persona al array</button></p>
```

Aquí aparecen dos pipes aplicadas sobre el mismo array:

- json: es una de las 3 pipes impuras que vienen en el core de Angular
- filterAge: la pipe que hemos programado nosotros. Es pura porque no hemos indicado lo contrario.

### Problema

Al presionar el botón de Añadir persona, se añade una persona mayor de 18 años. Ese cambio en el array se refleja en **dataArray | json** pero no se refleja en **dataArray | filterAge**.

Como los argumentos de entrada de filterAge son los mismos de antes (mismo array y mismo minAge), Angular deduce que el return de filterAge será el mismo que ya tiene previamente calculado, así que no vuelve a ejectuar el método transform.

### Solución menos profesional

Si declaramos la pipe como immpura

```ts
@Pipe({
  name: 'filterAge',
  pure: false
})
```

el problema desaparece. 

No obstante, si abrimos la consola del navegador y empezamos a tocar otros botones (aumentaBase, aumentaExponente, aumentaOtro... o incluso otros botones externos a este compenente) veremos que el método transform se está ejecutando una y otra vez pese a no ser necesario.

### Solución profesional: seguir las normas del patrón Inmutable

La solución más profesional es dejar la pipe pura

```ts
@Pipe({
  name: 'filterAge'
})
```

y aplicar las reglas de inmutabilidad, que dicen que un array o un objeto una vez construidos, no se pueden modificar. Si se quieren modificar, se deben construir nuevos arrays u objetos.

Clonando dataArray antes de cambiarlo, cumplimos la norma de que si queremos cambiar un array debemos construir uno nuevo:

```ts
addPerson() {
  this.dataArray = [...this.dataArray];
  this.dataArray.push({id: 4, name: 'Jose', age: 59});
}
```

Y de esta forma, el problema también se soluciona, porque ahora al añadir una persona al array, el primer argumento de filterAge sí que ha cambiado, con lo que Angular vuelve a ejectuar el método transform.

