# Subject

- Los Subjects son al mismo tiempo observadores y observables.

```ts
var subject = new Rx.Subject();

//Podemos suscribir observadores a subjects
subject.subscribe(v => console.log('consumer A: ' + v));
subject.subscribe(v => console.log('consumer B: ' + v));

var observable = Rx.Observable.from([0, 1]);
//Pero también podemos suscribir un subject a un observable.
observable.subscribe(subject);

/* Prints */
// Consumer A: 0
// Consumer B: 0
// Consumer A: 1
// Consumer B: 1
```

El código anterior produce la misma salida que el código siguiente:

```ts
var observable = Rx.Observable.from([0, 1]).publish();
observable.subscribe(v => console.log('consumer A: ' + v));
observable.subscribe(v => console.log('consumer B: ' + v));
observable.connect();

/* Prints */
// Consumer A: 0
// Consumer B: 0
// Consumer A: 1
// Consumer B: 1
```

- Los Subjects son calientes.

- Los Subjects tienen métodos para emitir valores, causar un error o enviar la señal de *complete*: **.next()**, **.error()** and **.complete()**.

```ts
var subject = new Rx.Subject();  

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)  
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)  
});

subject.next(3);

/* Prints */
// observerA: 2
// observerA: 3
// observerB: 3
```

## ReplaySubject

Con ReplaySubject, los subscriptores recibirán, justo en el momento de la subscripción, el último de los valores que se haya emitido además de todos los valores que se emitan en el futuro.

```ts
var subject = new Rx.ReplaySubject();  

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)  
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v) 
});

subject.next(3);

/* Prints */
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

Se le puede indicar el tamaño del buffer al instanciarlo:

```ts
var subject = new Rx.ReplaySubject(2);  
```

## BehaviourSubject

El contructor necesita un valor obligatorio que es el primero de los items emitidos. Los subscriptores recibirán, justo en el momento de la subscripción, el último de los valores que se haya emitido además de todos los valores que se emitan en el futuro.

```ts
var subject = new Rx.BehaviorSubject(0);

subject.subscribe({
  next: (v) => console.log('observer0: ' + v) 
});

subject.next(1);

subject.subscribe({
  next: (v) => console.log('observerA: ' + v) 
});

subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v) 
});

subject.next(3);

/* Prints */
// observer0: 0
// observer0: 1
// observerA: 1
// observer0: 2
// observerA: 2
// observerB: 2
// observer0: 3
// observerA: 3
// observerB: 3
```

Nota: Si se produce un error y después del error se suscriben observadores, los observadores recibirán únicamente el error. No recibirán ningún valor.

## AsyncSubject

Solamente emite cuando se complete. Emite el último valor que se haya pasado al método onNext().

```ts
var subject = new Rx.AsyncSubject();

var i = 0;
var handle = setInterval(function () {
    subject.onNext(i)
    if (++i > 3) {
        subject.onCompleted();
        clearInterval(handle);
    }
}, 500);

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

/* Prints */
// => Next: 3
// => Completed
```

Si termina con error, se emitirá únicamente el error.

## El método dispose()

El método dispose() desuscribe a todos los observadores y libera recursos:

```ts
subject = new Rx.Subject();

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

subject.onNext(42);
/* Prints */
// => Next: 42

subject.onCompleted();
/* Prints */
// => Completed

subject.dispose();

try {
    subject.onNext(56);
} catch (e) {
    console.log(e.message);
}

/* Prints */
// => Object has been disposed
```

## El método hasObservers()

El método hasObservers() devuelve *true* si el Subject tiene observdadores o *false* si no los tiene.

## El método toObservable()

El método toObservable() devuelve el Subject convertido en Observable.

### Cuándo utilizar Subject y cuándo no

http://davesexton.com/blog/post/To-Use-Subject-Or-Not-To-Use-Subject.aspx
