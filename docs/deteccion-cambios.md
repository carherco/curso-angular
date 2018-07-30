# Detección de cambios

## Detección de cambios por defecto

Por defecto angular sigue una estrategia dirty-checking en la que cada vez que ocurre algo susceptible de provocar un cambio (eventos, timers, promesas, observables...) comprueba dato a dato y en profundidad (propiedad de cada objeto de cada array...) si los valores actuales son iguales que los anteriores. Si detecta un cambio, re-renderiza las vistas.

Se le suele llamar también "pulling" porque se está continuamente (eventos, timers...) pidiendo a Angular que haga comprobaciones de cambios.

## ChangeDetectionStrategy.onPush

Angular espera a que el programador le diga que tiene que detectar cambios.

Excepciones: 
 - Un cambio en una REFERENCIA @Input. (cambio en la referencia, no en el valor) 
 - Un evento del DOM o asociado a un @Output


La detección del cambio manual se lanza:
 - Explícitamente por el programador mediante: ChangeDetectorRef.detectChanges()
 - Implícitamente al usar el pipe Async en la vista

 Nota: La pipe Async:
  - Se desuscribe cuando el componente se destruye
  - Llama automáticamente a ChangeDetectorRef.detectChanges()

Implicaciones:
- Hay que pasarle a los componentes hijos nuevas referencias (nuevos objetos)

ChangeDetectionStrategy.onPush se pone como metadato de un componente. El componente que lo lleve hace que él y sus hijos (excepto los router-outlet) funcionen con la misma estrategia.


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
