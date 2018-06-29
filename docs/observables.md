# Observables

Los Observables se basan en dos patrones de programación bien conocidos que es el patrón “Observer” y el patrón “Iterator”. Son la base de la *Programación Reactiva*. Angular incluye la librería de JavaScript RxJS para la programación reactiva.

Brevemente y yendo al grano: La programación reactiva trata de la programación con flujos de datos (data stream) de manera asíncrona.

 Un Observable es un mecanismo creado para representar flujos de datos. De esta manera no debemos pensar en arrays, eventos de ratón, llamadas http al servidor… separados, sino en algo que los agrupa a todos, el Observable.

 Cuando queremos trabajar utilizando programación reactiva con un tipo de dato concreto (por ejemplo, un array), habrá un método para poder transformar dicho dato en Observable y poder trabajar con él de esta manera.


## Uso básico y terminología.

Un *observable* es un objeto que publica datos y ofrece una función `subscribe()` que
es utilizada para crear *observadores*. Cuando el observable tiene los datos listos
para ser consumidos los pasa a los observadores subscritos a él para que los procesen.
Todo el procedimiento es asíncrono, es decir, la obtención del stream de datos se 
produce en un segundo plano. Solo cuando están listo se ejecutan las funciones 
asociadas a los observadores.

Los siguientes ejemplos ilustran y ayudan a coprender lo anterior.

### Creación de observables

La librería `RxJS` ofrece varias maneras de crear observables:

Desde un valor dato con `of`

```javascript
import { of } from "rxjs";
let observable = of("Hola que tal")
```

Dede un array con `from`

```javascript
import { from } from "rxjs";
let observable = from([1,2,3,"Hola que tal"])
```

Desde un contador periódico con `interval`

```javascript
import { interval } from "rxjs";
let observable = interval(1000)
```

Desde un evento del DOM

```javascript
import { fromEvent } from "rxjs";
let observable = fromEvent(document.getElementById('box'), "mousemove")
```

Desde una petición *ajax*
```javascript
import { ajax } from 'rxjs/ajax';
let o1 = ajax('https://jsonplaceholder.typicode.com/albums')
```

Definiendolo de manera personalizada

```javascript
import { Observable } from "rxjs"
let o1 = Observable.create((observer) => {
      let n = 0
      setInterval(
        () => {
          n++
          if(n > 5){
            observer.complete()
          }else{
            observer.next('Hola caracola ' + n)
          }
          
        }, 1000)
    })
  ```

  Esta última manera nos permite crear un observable a partir de cualquier cosa que 
  se nos ocurra. La función `create()` tiene como argumento una función de callback 
  cuyo argumento es el `observer` que se haya suscrito a ella. Todo lo que tenemos que
  hacer es usar los métodos del `observer` (`next`, `error`, `complete`) para pasarle
  los datos que deseemos.

  Hasta aquí solo hemos **declarado** observables. Esto es importante, los observables se definen declarativamente, lo que significa que **no se ejecutan** en el momento
  de definirlos. La ejecución se lleva a cabo solo cuando se realiza una subscripción.
  Este comportamiento, denominado "cold observable", se puede cambiar usando el método
  `publish` del observable, convirtiendolo en un "hot observable", que comienza a 
  ejecutarse en el momento en que se declara. El problema es que los subscriptores que
  se enganchen a un hot observable pueden no pillar todos los datos emitidos por dicho
  observable. Todo depende del momento en que realicen la subscripción.

  ### Subscripción a observables

  Siempre se hace de la misma manera, se haya declarado el observable de la manera que
  sea:

  ```javascript
  let observer = observable.subscribe({
    next(v){ /* procesamiento de v */},
    error(e){ /* procesamiento de e */ },
    complete(){/* completado el observable */}
    },
  })
  ```
  Cada vez que llegue un nuevo valor desde el observable se ejecutará `next()`, si 
  hay un error se ejecutará `error()` y cuando el observable ya no tenga más datos se
  ejecutará `complete()`.

  Si se recibe un error el observable libera la subscripción y deja de producir valores.

  También se puede realizar una subscripción más sencilla si no se requiere `error` o 
  `complete`.

  ```javascript
  let observer = observable.subscribe(v => { /* procesamiento de v */})
  ```

Es importante saber que, por defecto, un observable crea una ejecución nueva e 
independiente por cada observador subscrito. Este comportamiento puede cambiarse
mediante tecnicas de [multicasting](https://angular.io/guide/observables#multicasting)

### Operadores

Una de las ventajas de usar Observables es que los valores que producen pueden ser
transformados mediante operadores reactivos que operan sobre los data stream. Estos
operadores son **funciones puras** que posibilitan un estilo de programación funcional
sin efectos colaterales con operaciones como map, filter, concat, etc.

Veamos algunos ejemplos.

Comenzamos con uno muy sencillo. Vamos a crear un observable a partir de un array
con los números del 0 al 9. Y comenzamos convirtiendo los valores en sus cuadrados:

```javascript
import { from } from "rxjs";
import { map } from "rxjs/operators"
let o1 = from([1,2,3,4,5,6,7,8,9]).pipe(
      map(v => v*v)
    )
```

Las tranformaciones de los operadores se hacen a través de una `pipe`, la cual es 
una función que tiene un número ilimitado de argumentos, cada uno de los cuales es
un operador reactivo que actúa sobre los valores que va generando el observable. La
salida de cada uno de estos operadores es la entrada del siguiente operador y la salida
final constituye el data stream que se pasará a los observadores subscritos.

La siguiente suscripción mostraría en consola los cuadrados de los 10 primeros números:

```javascript
  let observer = observable.subscribe(v => { console.log(v) })
  ```

Ahora aplicamos otro operador más para filtrar los números pares:

```javascript
import { from } from "rxjs";
import { filter, map } from "rxjs/operators"
let o1 = from([1,2,3,4,5,6,7,8,9]).pipe(
      map(v => v*v),
      filter(v => v % 2 == 0)
    )
```

Vamos a por otro ejemplo más interesante. Recordemos el observable creado a partir 
de un evento del DOM que hemos puesto más arriba:

```javascript
import { fromEvent } from "rxjs";
let observable = fromEvent(document.getElementById('box'), "mousemove")
```

Los datos que va arrojando a los observadores subscritos son objetos de tipo 
`MouseEvent`, que tiene entre otros atributos la posición `x` e `y` del ratón.
Si solo nos interesa ese dato, podemos tranformar el stream de `MouseEvent` 
en un par [x, y]:

```javascript
import { fromEvent } from "rxjs";
let o1 = fromEvent(document.getElementById('box'), "mousemove").pipe(
      map(v => [v.clientX, v.clientY])
    )
```

Y ahora vamos a ir un poco más allá. Supongamos que solo nos interesa conocer
la posición del ratón cuando este se encuentra en una zona determinada del elemento
HTML, por ejemplo en el cuarto inferior derecho. Podemos aplicar un nuevo operador
`filter` sobre el resultado anterior.

```javascript
  let o1 = fromEvent(document.getElementById('box'), "mousemove").pipe(
      map(v => [v.clientX, v.clientY]),
      filter(v => v[0] > 300 && v[1] > 350)
    )
```
 Y ahora solo se generan datos de las posiciones cuando el ratón pasa por el 
 cuarto inferior derecho del elemento HTMl.


 ### Tratamiento de los errores en el observable

 Supongamos que en alguno de los operadores lanzamos una excepción

 ```javascript
 import { from, pipe } from "rxjs";
 import { filter, map } from "rxjs/operators"
 let o1 = from([0,1,2,3,4,5,6,7,8,9]).pipe(
      map(v => {
        if(v == 5){
          throw new Error('Oh no el 5!!!')
        }
        return v*v
      })
    )
```

Dicho error será tratado en la función `error()` del observador que se subscriba.

Pero podemos tratar el error en el propio observable también:

```javascript
import { from, pipe } from "rxjs";
import { filter, map, catchError } from "rxjs/operators";
let o1 = from([0,1,2,3,4,5,6,7,8,9]).pipe(
      map(v => {
        if(v == 5){
          throw new Error('Oh no el 5!!!')
        }
        return v*v
      }),     
      catchError(err => of("cambio el 5 por este mensaje"))
    )
```

Ahora, cuando se lance la excepción se genera el observable que creamos 
en la función catchError y, importante, será tratado por la función `next()`
del observador, no por `error()`.

Otra cosa muy potente de los observables es que en caso de fallo podemos 
realizar varios intentos con el operador `retry()`.

```javascript
import { from, pipe } from "rxjs";
import { filter, map, catchError, retry } from "rxjs/operators";
let o1 = from([0,1,2,3,4,5,6,7,8,9]).pipe(
      retry(3),
      map(v => {
        if(v == 5){
          throw new Error('Oh no el 5!!!')
        }
        return v*v
      }),     
      catchError(err => of("cambio el 5 por este mensaje"))
    )
```
## Los observables en Angular

Angular utilizar los observables de la librería RxJs para el tratamiento
de varias operaciones asíncronas.

- EventEmiter en la comunicación desde el componente hijo al padre (@Output)
- HttpClient
- Async Pipe, que se subscribe a un observable y va actualizando el valor en 
  la plantilla a medida que le llegan datos.
- Router events
- Formularios reactivos

[Índice](index.md)
