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
getConfig() {
  return this.http.get('http://.....');
}
```

```ts
showConfig() {
  this.configService.getConfig()
    .subscribe( data => this.config = {
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
  return this.http.get<Config>('http://.....');
}
```

```ts
config: Config;

showConfig() {
  this.configService.getConfig()
    .subscribe((data: Config) => this.config = data );
}
```

O la versión clonando la respuesta

```ts
config: Config;

showConfig() {
  this.configService.getConfig()
    // o clonando el objeto
    .subscribe((data: Config) => this.config = { ...data });
}
```

## Cómo leer la respuesta completa

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

## Manejo de errores

HttpClient emite un error en caso de mala conexión o de error en el servidor

```ts
showConfig() {
  this.configService.getConfig()
    .subscribe(
      (data: Config) => this.config = { ...data },
      error => this.error = error
    );
}
```

## Cómo cambiar el error por una emisión

La mejor forma de manejar errores es crear una función manejadora del error

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

Esta función devuelve un ErrorObservable con un mensaje.

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

## Leer respuestas con contenido que no sea JSON

```ts
getTextFile(filename: string) {
  return this.http.get(filename, {responseType: 'text'})
    .pipe(
      tap( 
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

## POST, PUT o DELETE

```ts
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```

## Los observables de HttpClient son fríos

Los observables devueltos por los métodos del servicio HttpClient son fríos. Esto permite que le podamos añadir operadores como tap, catchError, delay... y que podamos suscribirnos antes de que la llamada a la api se produzca.

Al llamar a subscribe es cuando el observable compone y envía la petición al servidor.

## Uso Avanzado

https://angular.io/guide/http#advanced-usage

## Intercepting requests and responses

https://angular.io/guide/http#intercepting-requests-and-responses

## Ejercicio

Crear un servicio para el CRUD de usuarios con los siguientes métodos:

- getAll()
- getOne(id: number)
- edit(id: number, user: User)
- add(user: User)
- delete(id: number)

El servicio consumirá la api https://reqres.in/

El compoente NO utilizarán directamente el servicio HttpClient. Deberá ser el servicio el que realice las peticiones.

[Índice](index.md)
