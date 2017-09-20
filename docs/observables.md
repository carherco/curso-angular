# Observables

Los Observables se basan en dos patrones de programación bien conocidos que es el patrón “Observer” y el patrón “Iterator”. Son la base de la *Programación Reactiva*. Angular incluye la librería de JavaScript RxJS para la programación reactiva.

 Un Observable es un mecanismo creado para representar flujos de datos. De esta manera no debemos pensar en arrays, eventos de ratón, llamadas http al servidor… separados, sino en algo que los agrupa a todos, el Observable.

 Cuando queremos trabajar utilizando programación reactiva con un tipo de dato concreto (por ejemplo, un array), habrá un método para poder transformar dicho dato en Observable y poder trabajar con él de esta manera.

```javascript
  let observable = Rx.Observable.from(array);
```

Luego creas de manera similar un Observador, ese es el elemento que mirará y reaccionara a los cambios que sucedan. 

```javascript
  let observador = Rx.Observer.create(
    function onNext(x) { console.log('Next: ' + x); }, 
    function onError(err) { console.log('Error: ' + err); }, 
    function onCompleted() { console.log('Completed'); } 
  ); 
```

Aquí tenemos a nuestro Observador. Es un poco raro porque en realidad solo se trata de un objeto con tres métodos que dicen que hacer en el caso de que el Observable (nuestro array, una llamada http... en definitiva cualquier flujo de datos) cambie (onNext), emita un error (onError) o se complete el flujo, terminando su emisión (onCompleted). 

Claro que todo esto no funcionará si no suscribimos a nuestro Observador a nuestro Observable y de esta forma el Observable comunique al Observador sus cambios.

```javascript
  let suscripcion = observable.suscribe(observador);
```

En cualquier momento, podemos desuscribir al observador.

```javascript
  suscripcion.unsuscribe();
```

Ya tenemos la base de la programación reactiva.

## Observables caliente vs. observables fríos

Un observable caliente empieza a emitir items tan pronto como es creado. Si un observador se suscribe a mitad de secuencia, se habrá perdido parte de la emisión.

Un observable frío esperaa que un observador se suscriba antes de empezar a emitir items. Garantizan que el observador verá toda la secuencia completa.


## Ejemplos de Observable

Veamos un par de ejemplos prácticos: cold-observables, hero-list


## Reactive extensions

La verdadera potencia de los observables son las extensiones reactivas (ReactiveX): operadores que permiten transformar, combinar, manipular y trabajar con la secuencia de items emitida por los Observables.

http://reactivex.io/documentation/observable.html


### Ejemplos de Reactive extensions

Veamos algunos ejemplos con reactive extensions: hero-search



## Cold Observables
 - Una instancia por cada subscripción
 - El observable empieza en el momento de la subscripción
 - Desuscribirse del observable para liberar memoria

 ## Hot Observables

 Un hot observable empieza a su emisión cuando se invoca su método connect():

```javascript
  const obsv = new Observable( o => {...});
  ...
  obsv.connect();
```

Pero los observables que creamos nosotros con los métodos de construcción de observables (new, create, from, of...) construyen observables fríos. 

Para convertir un obserbable frío en caliente basta con invocar el método publish();

```javascript
  const obsv = new Observable( o => {...}).publish();
  ...
  obsv.connect();
```

Los suscriptores pueden suscribirse y desuscribirse sin problemas antes de invocar al connect() o depués de invocar a connect().

Es como llegar a un concierto con antelación para coger un buen sitio, o llegar tarde y perderte parte del concierto. Pero el concierto no espera a los asistentes.


http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
http://rxmarbles.com/



http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap
