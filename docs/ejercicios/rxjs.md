# Ejercicios de RxJS

## Ejercicio 1: Operadores

Dado el siguiente observable:

```js
data$ = from([1, 12, 'foo', 8, 5, 2, 'bar', 7, 18]);
```

Utilizar los operadores necesarios que calculen la suma total de los valores numéricos.

Ignora (filtra) los valores no numéricos.

El observador recibirá una única emisión con la suma ya calculada.

```js
this.data$.pipe(
      // Completar con operadores
    ).subscribe(
      suma => {
        this.suma = suma;
      }
    );
```

## Ejercicio 2: Operadores

Escribe los operadores necesarios en la función pipe() de este observable para que realice una cuenta atrás comenzando desde el valor indicado en la propiedad inicio.

Extra: Que la cuenta atrás se pare en 0.

```typescript
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-ejercicio2',
  template: '<div>{{ cuenta }}</div>'
})
export class Ejercicio2Component {
  private inicio = 10;
  public cuenta;
  private suscripcion;

  public countdown$ = interval(1000).pipe(
    // Completar con operadores
  );

  constructor() {
    this.suscripcion = this.countdown$.subscribe(
      dato => this.cuenta = dato
    );
  }

  ngOnDestroy() {
    this.suscripcion.unsuscribe();
  }

}
```
