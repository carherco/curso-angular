# HTTPClient

Se trata de un servicio que podemos inyectar en nuestros componentes y servicios
para realizar peticiones HTTP. Está especialmente pensado para el uso de API's REST.

Para utilizar este servicio hemos de importar el módulo `HttpClientModule`.

```javascript
import { HttpClientModule } from '@angular/common/http';
```

Si queremos tenerlo disponible en toda la aplicación realizaremos la importación en
el módulo principal `AppModule`.

El servicio `HttpClient` se importa donde lo necesitemos de la siguiente manera:

```javascript
import { HttpClient } from '@angular/common/http';
```

Y lo inyectamos por un constructor del componente o servicio:

```javascript
constructor(private http: HttpClient){}
```

El servicio permite realizar todos los tipo de peticiones HTTP (GET, POST, PUT, DELETE, HEAD, PATCH, ...) de manera asíncrona utilizando observables. En efecto cada uno de los métodos siguientes devuelve un observable al que podemos subscribirnos para obtener/enviar datos a la API REST:

```javascript
http.get('http://la.url')
http.put('http://la.url/4', data)
http.post('http://la.url', data)
http.delete('http://la.url/4')
```

Normalmente, cuando usamos una API REST, hay que enviar ciertos headers. Un header típico es
el `Content-Type: application/json`. El servicio `HttpClient` admite headers que se definen
de la siguiente manera:

```javascript
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

http.get('http://la.url', httpOptions)
http.put('http://la.url/4', data, httpOptions)
http.post('http://la.url', data,httpOptions)
http.delete('http://la.url/4', httpOptions)
```

En  lugar de usar `HttpClient` directamente en un componente, es aconsejable crear un servicio
que dependa de `HttpClient` para realizar las operaciones sobre la API y usarlo en el componente que lo requiera. La idea, como siempre, es ocultar en el servicio los detalles de implementación, que pueden llegar a ser muy farragosos, y construir componentes fáciles de leer y mantener. Además se gana en reutilización.

## Cómo tipar la respuesta

```ts
configUrl = 'assets/config.json';

getConfig() {
  return this.http.get(this.configUrl);
}
```

```ts
showConfig() {
  this.configService.getConfig()
    .subscribe((data: Config) => this.config = {
        heroesUrl: data['heroesUrl'],
        textfile:  data['textfile']
    });
}
```

Para que el compilador no se queje, hemos tenido que utilizar corchetes cuadrados y varias líneas de código.

Si creamos una interfaz, obtendremos algunas ventajas:

```ts
export interface Config {
  heroesUrl: string;
  textfile: string;
}
```

```ts
getConfig() {
  // now returns an Observable of Config
  return this.http.get<Config>(this.configUrl);
}
```

```ts
config: Config;

showConfig() {
  this.configService.getConfig()
    // clone the data object, using its known Config shape
    .subscribe((data: Config) => this.config = { ...data });
}
```

## Cómo leer la respuesta completa

```ts
getConfigResponse(): Observable<HttpResponse<Config>> {
  return this.http.get<Config>(
    this.configUrl, { observe: 'response' });
}
```

```ts
showConfigResponse() {
  this.configService.getConfigResponse()
    // resp is of type `HttpResponse<Config>`
    .subscribe(resp => {
      // display its headers
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);

      // access the body directly, which is typed as `Config`.
      this.config = { ... resp.body };
    });
}
```

## Manejo de errores

HttpClient emite un error en caso de mala conexión o de error en el servidor

```ts
showConfig() {
  this.configService.getConfig()
    .subscribe(
      (data: Config) => this.config = { ...data }, // success path
      error => this.error = error // error path
    );
}
```

## Getting error details

La mejor forma de manejar errores es 
```ts
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
```

this handler returns an RxJS ErrorObservable with a user-friendly error message. Consumers of the service expect service methods to return an Observable of some kind, even a "bad" one.

```ts
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
}
```

## El operador retry()

```ts
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}
```

## Requesting non-JSON data

```ts
getTextFile(filename: string) {
  // The Observable returned by get() is of type Observable<string>
  // because a text response was specified.
  // There's no need to pass a <string> type parameter to get().
  return this.http.get(filename, {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
        data => this.log(filename, data),
        error => this.logError(filename, error)
      )
    );
}
```

```ts
download() {
  this.downloaderService.getTextFile('assets/textfile.txt')
    .subscribe(results => this.contents = results);
}
```

## POST, PUT o DELETE

```ts
/** POST: add a new hero to the database */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```

## Los observables de HttpClient son fríos

All observables returned from HttpClient methods are cold by design. Execution of the HTTP request is deferred, allowing you to extend the observable with additional operations such as tap and catchError before anything actually happens.

Calling subscribe(...) triggers execution of the observable and causes HttpClient to compose and send the HTTP request to the server.



## Advanced usage

https://angular.io/guide/http#advanced-usage

## Intercepting requests and responses

https://angular.io/guide/http#intercepting-requests-and-responses


## Ejercicio:

Programar un CRUD de usuarios con las siguientes especificaciones:

- Una clase User con la definición de nuestro modelo
- Un componente para el listado: UserList
- Un componente para editar usuarios: UserEdit
- Un componente para añadir usuarios: UserAdd
- Un servicio UserService con los métodos:
  - getAll()
  - getOne(id: number)
  - edit(id: number, user: User)
  - add(user: User)
  - delete(id: number)

- Los componetes NO utilizarán directamente el servicio HttpClient


[Índice](index.md)
