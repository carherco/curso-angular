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

## Ejemplo

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
