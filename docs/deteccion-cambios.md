# Detección de cambios

Angular se apoya internamente en la librería **zone.js** para manejar la detección de cambios.

## Detección de cambios por defecto

Por defecto angular sigue una estrategia dirty-checking en la que cada vez que ocurre algo susceptible de provocar un cambio (eventos, timers, promesas, observables...) comprueba dato a dato y en profundidad (propiedad de cada objeto de cada array...) si los valores actuales son iguales que los anteriores. Si detecta un cambio, re-renderiza las vistas. 

Se le suele llamar también "pulling" porque se está continuamente (eventos, timers...) pidiendo a Angular que haga comprobaciones de cambios.

## ChangeDetectionStrategy.onPush

Con esta estrategia, Angular asume que todos nuestros objetos son **Inmutables**. Es decir, que los valores de sus propiedades NO van a cambiar.

Angular espera a que el programador le diga que tiene que detectar cambios.

Excepciones:

- Un cambio en una REFERENCIA @Input. (cambio en la referencia, no en el valor, ya que angular considerará que los objetos son inmutables)
- Un evento del DOM o asociado a un @Output
- Un observable genere un evento ¿?

Según comenta Victor Savkin (core contributor de Angular) en su blog:

```
When using OnPush detectors, then the framework will check an OnPush component when any of its input properties changes, when it fires an event, or when an Observable fires an event
```

La detección del cambio manual se lanza:

- Explícitamente por el programador mediante: ChangeDetectorRef.detectChanges()
- Implícitamente al usar el pipe Async en la vista

 Nota: La pipe Async:

- Se desuscribe cuando el componente se destruye
- Llama automáticamente a ChangeDetectorRef.detectChanges()

Implicaciones:

- Hay que pasarle a los componentes hijos nuevas referencias (nuevos objetos).

ChangeDetectionStrategy.onPush se pone como metadato de un componente.

```ts
@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  // ...
}
```

El componente que lo lleve hace que él y sus hijos (excepto los router-outlet) funcionen con la misma estrategia.

Ejemplo en el módulo *deteccion-cambios*

## Técnicas de clonado

No hay que clonar datos primitivos (number, string, boolean...) porque al cambiar su valor, se considera con @Input que ha cambiado la referencia.

### Clonado simple con el operador spread

Para cambiar un valor de una propiedad y acabar con un objeto clonado, podemos hacer lo siguiente:

```js
target = {...original}
target.name = 'xxxx';
target.age = '7';
```

o en una sola instrucción:

```js
target = {...original, name: 'xxxx', age: 7}
```

Este método no maneja borrado de propiedades ni clonado de métodos.

### Clonados complejos

Utilizar librerías especializadas que realicen clonados eficientes (por ejemplo: Immutablejs)


Documentación oficial: (https://angular.io/api/core/ChangeDetectorRef)
